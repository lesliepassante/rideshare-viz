import { createSelector } from 'reselect';
import { FILES_PER_SECOND, SECONDS_TO_BUFFER } from 'utils/constants';

const getFiles = state => state.files.data;
const getCurrentFileIndex = state => state.files.currentFileIndex;

const getUnloadedBufferFiles = createSelector(
  [getCurrentFileIndex, getFiles],
  (currentFileIndex, files) => {
    const nextUnloadedFileIndex = files.findIndex((file, i) => i >= currentFileIndex && !file.status.loaded);
    return files.slice(nextUnloadedFileIndex, nextUnloadedFileIndex + SECONDS_TO_BUFFER * FILES_PER_SECOND);
  }
);

export default getUnloadedBufferFiles;
