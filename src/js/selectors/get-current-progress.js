import { createSelector } from 'reselect';
import getAllFrames from './get-all-frames';
import { FRAMES_PER_FILE } from 'utils/constants';

const getCurrentFileIndex = state => state.files.currentFileIndex;
const getCurrentFrameIndex = state => state.files.currentFrameIndex;

const getCurrentProgress = createSelector(
  [getCurrentFileIndex, getCurrentFrameIndex, getAllFrames],
  (currentFileIndex, currentFrameIndex, allFrames) => {
    const currentTotalFrameIndex = FRAMES_PER_FILE * currentFileIndex + currentFrameIndex;
    const progress = (currentTotalFrameIndex / (allFrames.length - 1)) * 100 || 0;
    return progress;
  }
);

export default getCurrentProgress;
