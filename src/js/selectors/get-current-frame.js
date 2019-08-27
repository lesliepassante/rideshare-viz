import { createSelector } from 'reselect';
import getCurrentFile from './get-current-file';

const getCurrentFrameIndex = state => state.files.currentFrameIndex;

const getCurrentFrame = createSelector(
  [getCurrentFile, getCurrentFrameIndex],
  (currentFile, currentFrameIndex) => {
    return (currentFile && currentFile.frames[currentFrameIndex]) || null;
  }
);

export default getCurrentFrame;
