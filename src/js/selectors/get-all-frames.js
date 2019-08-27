import { createSelector } from 'reselect';

const getFiles = state => state.files.data;

const getAllFrames = createSelector(
  getFiles,
  files => {
    return files.reduce((acc, file) => acc.concat(file.frames), []);
  }
);

export default getAllFrames;
