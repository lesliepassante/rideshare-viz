import { createSelector } from 'reselect';
import { FILES_PER_SECOND, SECONDS_TO_BUFFER } from 'utils/constants';

const getFiles = state => state.files.data;
const getCurrentFileIndex = state => state.files.currentFileIndex;

const getBufferFiles = createSelector(
  [getCurrentFileIndex, getFiles],
  (currentFileIndex, files) => {
    return files.slice(currentFileIndex, currentFileIndex + SECONDS_TO_BUFFER * FILES_PER_SECOND);
  }
);

export default getBufferFiles;
