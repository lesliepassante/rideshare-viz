import { createSelector } from 'reselect';
import getPreviousFile from './get-previous-file';

const getPreviousFrameIndex = state => state.files.previousFrameIndex;

const getPreviousFrame = createSelector(
  [getPreviousFile, getPreviousFrameIndex],
  (previousFile, previousFrameIndex) => {
    return (previousFile && previousFile.frames[previousFrameIndex]) || null;
  }
);

export default getPreviousFrame;
