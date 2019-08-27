import { createSelector } from 'reselect';

const getFiles = state => state.files.data;
const getPreviousFileIndex = state => state.files.previousFileIndex;

const getPreviousFile = createSelector(
  [getPreviousFileIndex, getFiles],
  (previousFileIndex, files) => {
    return files[previousFileIndex] || null;
  }
);

export default getPreviousFile;
