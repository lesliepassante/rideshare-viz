import { FRAMERATE, FRAMES_PER_FILE, SECONDS_TO_SKIP, FILES_PER_SECOND } from 'utils/constants';
import Worker from 'workers/load-files';
import { getBufferFiles, getUnloadedBufferFiles, getNextFramePosition } from 'selectors';

let simulationTimer;

export const CHOOSE_FILES_SUCCESS = 'CHOOSE_FILES_SUCCESS';
export const chooseFilesSuccess = (files = []) => ({
  type: CHOOSE_FILES_SUCCESS,
  files
});

export const CHOOSE_FILES_FAILURE = 'CHOOSE_FILES_FAILURE';
export const chooseFilesFailure = (error = 'Files could not be loaded.') => ({
  type: CHOOSE_FILES_FAILURE,
  error
});

export const LOAD_FILES_REQUEST = 'LOAD_FILES_REQUEST';
export const loadFilesRequest = (filenames = []) => ({
  type: LOAD_FILES_REQUEST,
  filenames
});

export const LOAD_FILES_SUCCESS = 'LOAD_FILES_SUCCESS';
export const loadFilesSuccess = (files = {}) => ({
  type: LOAD_FILES_SUCCESS,
  files
});

export const LOAD_FILES_FAILURE = 'LOAD_FILES_FAILURE';
export const loadFilesFailure = (error = 'Files could not be loaded.') => ({
  type: LOAD_FILES_FAILURE,
  error
});

export const PLAY_SIMULATION = 'PLAY_SIMULATION';
export const playSimulation = () => ({
  type: PLAY_SIMULATION
});

export const CHANGE_SIMULATION_FRAME = 'CHANGE_SIMULATION_FRAME';
export const changeSimulationFrame = ({ fileIndex = 0, frameIndex = 0 } = {}) => ({
  type: CHANGE_SIMULATION_FRAME,
  fileIndex,
  frameIndex
});

export const BUFFER_SIMULATION = 'BUFFER_SIMULATION';
export const bufferSimulation = () => ({
  type: BUFFER_SIMULATION
});

export const PAUSE_SIMULATION = 'PAUSE_SIMULATION';
export const pauseSimulation = () => ({
  type: PAUSE_SIMULATION
});

export const STOP_SIMULATION = 'STOP_SIMULATION';
export const stopSimulation = () => ({
  type: STOP_SIMULATION
});

export const SELECT_DRIVER = 'SELECT_DRIVER';
export const selectDriver = driverId => ({
  type: SELECT_DRIVER,
  driverId
});

export const DESELECT_DRIVER = 'DESELECT_DRIVER';
export const deselectDriver = () => ({
  type: DESELECT_DRIVER
});

export const chooseFilesAndPlaySimulation = fileList => {
  const files = [...fileList];
  return async dispatch => {
    dispatch(chooseFilesSuccess(files));
    await dispatch(loadFilesIfNeeded());
    dispatch(startPlayingSimulation({ fileIndex: 0, frameIndex: 0 }));
  };
};

export const startPlayingSimulation = ({ fileIndex, frameIndex } = {}) => {
  return (dispatch, getState) => {
    const { currentFileIndex, currentFrameIndex } = getState().files;
    fileIndex = typeof fileIndex === 'number' ? fileIndex : currentFileIndex;
    frameIndex = typeof frameIndex === 'number' ? frameIndex : currentFrameIndex;

    clearInterval(simulationTimer);
    simulationTimer = setInterval(() => dispatch(advanceToNextFrame()), 1000 / FRAMERATE);
    dispatch(changeSimulationFrame({ fileIndex, frameIndex }));
    dispatch(playSimulation());
  };
};

export const stopPlayingSimulation = () => {
  return dispatch => {
    clearInterval(simulationTimer);
    dispatch(stopSimulation());
  };
};

export const pausePlayingSimulation = () => {
  return dispatch => {
    clearInterval(simulationTimer);
    dispatch(pauseSimulation());
  };
};

export const skipToFrame = ({ fileIndex = 0, frameIndex = 0 } = {}) => {
  return (dispatch, getState) => {
    const state = getState();
    const targetFrame = getFrame(state, { fileIndex, frameIndex });
    const targetFrameExists = typeof targetFrame === 'object';
    const targetFrameIsLoaded = targetFrame && !!targetFrame.geojson;
    if (targetFrameExists) {
      dispatch(changeSimulationFrame({ fileIndex, frameIndex }));
      dispatch(loadFilesIfNeeded());
      if (!targetFrameIsLoaded) {
        dispatch(bufferSimulation());
      }
    } else {
      dispatch(stopPlayingSimulation());
    }
  };
};

export const advanceToNextFrame = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.status.buffered) return;
    const { fileIndex, frameIndex } = getNextFramePosition(state);
    dispatch(skipToFrame({ fileIndex, frameIndex }));
  };
};

export const skipForward = () => {
  return (dispatch, getState) => {
    const state = getState();
    const targetFileIndex = state.files.currentFileIndex + SECONDS_TO_SKIP * FILES_PER_SECOND;
    const targetFile = state.files.data[targetFileIndex];

    if (targetFile) {
      dispatch(
        skipToFrame({
          fileIndex: targetFileIndex,
          frameIndex: state.files.currentFrameIndex
        })
      );
    } else {
      const lastFileIndex = state.files.data.length - 1;
      const lastFrameIndex = state.files.data[lastFileIndex].frames.length - 1;
      dispatch(
        skipToFrame({
          fileIndex: lastFileIndex,
          frameIndex: lastFrameIndex
        })
      );
    }
  };
};

export const skipBack = () => {
  return (dispatch, getState) => {
    const state = getState();
    const targetFileIndex = state.files.currentFileIndex - SECONDS_TO_SKIP * FILES_PER_SECOND;
    const targetFile = state.files.data[targetFileIndex];

    if (targetFile) {
      dispatch(
        skipToFrame({
          fileIndex: targetFileIndex,
          frameIndex: state.files.currentFrameIndex
        })
      );
    } else {
      dispatch(
        skipToFrame({
          fileIndex: 0,
          frameIndex: 0
        })
      );
    }
  };
};

export const loadFilesIfNeeded = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadIsPending = state.status.loading;
    if (loadIsPending) return;

    const bufferFiles = getBufferFiles(state);
    const bufferFilesAreLoaded = bufferFiles.every(file => file.status.loading || file.status.loaded);
    if (bufferFilesAreLoaded) return;

    const filesToLoad = getUnloadedBufferFiles(state).map(file => file.raw);

    dispatch(loadFilesRequest(filesToLoad.map(file => file.name)));

    try {
      const files = await fetchFiles(filesToLoad);
      dispatch(loadFilesSuccess(files));
    } catch (err) {
      dispatch(loadFilesFailure(err));
    }
  };
};

async function fetchFiles(filesToLoad) {
  const numFramesToCreate = FRAMES_PER_FILE - 1;

  return new Promise((resolve, reject) => {
    const worker = new Worker();
    const result = {};

    worker.onmessage = ({ data: { error, frames, geojson, name, success } }) => {
      if (error) return reject(error);
      if (success) return resolve(result);
      if (name && !result[name]) result[name] = {};
      if (name && geojson) result[name].geojson = geojson;
      if (name && frames) result[name].frames = frames;
    };
    worker.onerror = ({ message }) => {
      reject(message);
    };
    worker.postMessage({ filesToLoad, numFramesToCreate });
  });
}

function getFrame(state, { fileIndex = 0, frameIndex = 0 } = {}) {
  if (state.files.data[fileIndex] && typeof state.files.data[fileIndex].frames[frameIndex] === 'object') {
    return state.files.data[fileIndex].frames[frameIndex];
  }
  return;
}
