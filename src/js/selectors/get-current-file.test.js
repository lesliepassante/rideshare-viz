import test from 'tape';
import selector from 'selectors/get-current-file';
import createState from 'reducers/index.factory';
import { createFile, createState as createFileState } from 'reducers/files.factory';

test('getCurrentFile() with no file', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = null;

  same(actual, expected, msg);
  end();
});

test('getCurrentFile() with file', ({ same, end }) => {
  const msg = 'should return correct data';

  const currentFile = createFile({ name: 'x' });
  const notCurrentFile = createFile({ name: 'y' });

  const initial = createState({
    files: createFileState({
      currentFileIndex: 1,
      currentFrameIndex: 0,
      data: [notCurrentFile, currentFile]
    })
  });

  const actual = selector(initial);
  const expected = currentFile;

  same(actual, expected, msg);
  end();
});
