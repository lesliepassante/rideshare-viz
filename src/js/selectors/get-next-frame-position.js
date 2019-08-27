import { createSelector } from 'reselect';

const getFiles = state => state.files.data;
const getCurrentFileIndex = state => state.files.currentFileIndex;
const getCurrentFrameIndex = state => state.files.currentFrameIndex;

const getNextFramePosition = createSelector(
  [getCurrentFileIndex, getCurrentFrameIndex, getFiles],
  (currentFileIndex, currentFrameIndex, files) => {
    if (files[currentFileIndex] && typeof files[currentFileIndex].frames[currentFrameIndex + 1] === 'object') {
      return {
        fileIndex: currentFileIndex,
        frameIndex: currentFrameIndex + 1
      };
    } else if (files[currentFileIndex + 1] && typeof files[currentFileIndex + 1].frames[0] === 'object') {
      return {
        fileIndex: currentFileIndex + 1,
        frameIndex: 0
      };
    } else {
      return {
        fileIndex: null,
        frameIndex: null
      };
    }
  }
);

export default getNextFramePosition;
