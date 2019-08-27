import test from 'tape';
import selector from 'selectors/get-previous-file';
import createState from 'reducers/index.factory';
import { createFile, createState as createFileState } from 'reducers/files.factory';

test('getPreviousFile() with no file', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = null;

  same(actual, expected, msg);
  end();
});

test('getPreviousFile() with file', ({ same, end }) => {
  const msg = 'should return correct data';

  const currentFile = createFile({ name: 'x' });
  const previousFile = createFile({ name: 'y' });

  const initial = createState({
    files: createFileState({
      currentFileIndex: 1,
      currentFrameIndex: 0,
      previousFileIndex: 0,
      previousFrameIndex: 0,
      data: [previousFile, currentFile]
    })
  });

  const actual = selector(initial);
  const expected = previousFile;

  same(actual, expected, msg);
  end();
});
