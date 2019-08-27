import { createSelector } from 'reselect';
import getNextFramePosition from './get-next-frame-position';

const getFiles = state => state.files.data;

const getNextFrame = createSelector(
  [getNextFramePosition, getFiles],
  ({ fileIndex, frameIndex } = {}, files) => {
    return files[fileIndex] && files[fileIndex].frames[frameIndex];
  }
);

export default getNextFrame;
