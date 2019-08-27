import test from 'tape';
import selector from 'selectors/get-next-frame';
import createState from 'reducers/index.factory';
import { createFile, createFrame, createState as createFileState } from 'reducers/files.factory';

test('getNextFrame() with no frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = undefined;

  same(actual, expected, msg);
  end();
});

test('getNextFrame() with one file and multiple frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const frameOne = createFrame({ name: 'x' });
  const frameTwo = createFrame({ name: 'y' });

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: 0,
      data: new Array(1).fill(
        createFile({
          frames: [frameOne, frameTwo]
        })
      )
    })
  });

  const actual = selector(initial);
  const expected = frameTwo;

  same(actual, expected, msg);
  end();
});

test('getNextFrame() with multiple files and one frame', ({ same, end }) => {
  const msg = 'should return correct data';

  const frameOne = createFrame({ name: 'x' });
  const frameTwo = createFrame({ name: 'y' });

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: 0,
      data: [
        createFile({
          frames: [frameOne]
        }),
        createFile({
          frames: [frameTwo]
        })
      ]
    })
  });

  const actual = selector(initial);
  const expected = frameTwo;

  same(actual, expected, msg);
  end();
});
