import { CHANGE_SIMULATION_FRAME, CHOOSE_FILES_SUCCESS, LOAD_FILES_REQUEST, LOAD_FILES_SUCCESS } from 'actions';
import { FILES_PER_SECOND, FRAMES_PER_FILE, SECONDS_TO_BUFFER } from 'utils/constants';

const initialState = {
  data: [],
  currentFileIndex: 0,
  currentFrameIndex: 0,
  previousFileIndex: 0,
  previousFrameIndex: 0
};

export default function files(state = initialState, action = {}) {
  switch (action.type) {
    case CHOOSE_FILES_SUCCESS: {
      return {
        ...state,
        ...{
          data: action.files.map((file, i) => {
            const isLastFile = i === action.files.length - 1;
            return {
              frames: Array(isLastFile ? 1 : FRAMES_PER_FILE).fill(null),
              geojson: null,
              date: new Date(file.name.replace('.json', '')),
              name: file.name,
              status: {
                ...file.status,
                ...{ loaded: false, loading: false }
              },
              raw: file
            };
          })
        }
      };
    }

    case LOAD_FILES_REQUEST: {
      return {
        ...state,
        ...{
          data: state.data.map(file => {
            return {
              ...file,
              ...{
                status: {
                  ...file.status,
                  ...{ loading: action.filenames.includes(file.name) }
                }
              }
            };
          })
        }
      };
    }

    case LOAD_FILES_SUCCESS: {
      return {
        ...state,
        ...{
          data: state.data.map(file => {
            const updatedFile = action.files[file.name];
            if (updatedFile) {
              const geojson = updatedFile.geojson;
              const frames = file.frames.map((frame, i) => updatedFile.frames[i] || frame);
              const status = { loaded: frames.every(frame => frame), loading: false };

              return {
                ...file,
                ...{
                  frames,
                  geojson,
                  status: {
                    ...file.status,
                    ...status
                  }
                }
              };
            } else {
              return { ...file };
            }
          })
        }
      };
    }

    case CHANGE_SIMULATION_FRAME: {
      const currentFileIndex = action.fileIndex;
      const currentFrameIndex = action.frameIndex;

      const currentFile = state.data[state.currentFileIndex];
      const previousFileIndex =
        currentFile && currentFile.status.loaded ? state.currentFileIndex : state.previousFileIndex;

      const previousFrameIndex =
        currentFile && currentFile.status.loaded ? state.currentFrameIndex : state.previousFrameIndex;

      const filesToBuffer = SECONDS_TO_BUFFER * FILES_PER_SECOND;

      const data = state.data.map((file, i) => {
        if (i < currentFileIndex - filesToBuffer || i > currentFileIndex + filesToBuffer) {
          file.geojson = null;
          file.frames.fill(null);
          file.status = {
            ...file.status,
            ...{
              loaded: false
            }
          };
        }
        return file;
      });

      return {
        ...state,
        currentFileIndex,
        currentFrameIndex,
        previousFileIndex,
        previousFrameIndex,
        data
      };
    }

    default:
      return state;
  }
}
