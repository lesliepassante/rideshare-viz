import test from 'tape';
import selector from 'selectors/get-next-frame-position';
import createState from 'reducers/index.factory';
import { createFile, createFrame, createState as createFileState } from 'reducers/files.factory';

test('getNextFramePosition() with no frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = { fileIndex: null, frameIndex: null };

  same(actual, expected, msg);
  end();
});

test('getNextFramePosition() with one file and multiple frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: 0,
      data: new Array(1).fill(
        createFile({
          frames: new Array(2).fill(createFrame())
        })
      )
    })
  });

  const actual = selector(initial);
  const expected = {
    fileIndex: 0,
    frameIndex: 1
  };

  same(actual, expected, msg);
  end();
});

test('getNextFrame() with multiple files and one frame', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: 0,
      data: new Array(2).fill(
        createFile({
          frames: new Array(1).fill(createFrame())
        })
      )
    })
  });

  const actual = selector(initial);
  const expected = {
    fileIndex: 1,
    frameIndex: 0
  };

  same(actual, expected, msg);
  end();
});
