import { createSelector } from 'reselect';
import getBufferFiles from './get-buffer-files';

const getBufferFrames = createSelector(
  getBufferFiles,
  bufferFiles => {
    return bufferFiles.reduce((acc, file, i) => {
      if (bufferFiles.length - 1 === i) return acc.concat([file.frames[0]]);
      return acc.concat(file.frames);
    }, []);
  }
);

export default getBufferFrames;
