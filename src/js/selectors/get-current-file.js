import { createSelector } from 'reselect';

const getFiles = state => state.files.data;
const getCurrentFileIndex = state => state.files.currentFileIndex;

const getCurrentFile = createSelector(
  [getCurrentFileIndex, getFiles],
  (currentFileIndex, files) => {
    return files[currentFileIndex] || null;
  }
);

export default getCurrentFile;
