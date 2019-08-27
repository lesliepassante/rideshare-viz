import test from 'tape';
import selector from 'selectors/get-current-progress';
import createState from 'reducers/index.factory';
import { createFile, createFrame, createState as createFileState } from 'reducers/files.factory';
import { FRAMES_PER_FILE } from 'utils/constants';

test('getCurrentProgress() with no frame', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = 0;

  same(actual, expected, msg);
  end();
});

test('getCurrentProgress() with 0%', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: 0,
      data: new Array(1).fill(
        createFile({
          frames: new Array(3).fill(createFrame())
        })
      )
    })
  });

  const actual = selector(initial);
  const expected = 0;

  same(actual, expected, msg);
  end();
});

test('getCurrentProgress() with 100%', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState({
    files: createFileState({
      currentFileIndex: 1,
      currentFrameIndex: FRAMES_PER_FILE - 1,
      data: new Array(2).fill(
        createFile({
          frames: new Array(FRAMES_PER_FILE).fill(createFrame())
        })
      )
    })
  });

  const actual = selector(initial);
  const expected = 100;

  same(actual, expected, msg);
  end();
});

test('getCurrentProgress() with mid %', ({ same, end }) => {
  const msg = 'should return correct data';

  const filesToCreate = 2;

  const percent = ((FRAMES_PER_FILE - 1) / (FRAMES_PER_FILE * filesToCreate - 1)) * 100;

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: FRAMES_PER_FILE - 1,
      data: new Array(filesToCreate).fill(
        createFile({
          frames: new Array(FRAMES_PER_FILE).fill(createFrame())
        })
      )
    })
  });

  const actual = selector(initial);
  const expected = percent;

  same(actual, expected, msg);
  end();
});
