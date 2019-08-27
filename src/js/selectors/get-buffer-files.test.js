import test from 'tape';
import selector from 'selectors/get-buffer-files';
import createState from 'reducers/index.factory';
import { createFile, createState as createFileState } from 'reducers/files.factory';
import { FILES_PER_SECOND, SECONDS_TO_BUFFER } from 'utils/constants';

test('getBufferFiles() with no files', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = [];

  same(actual, expected, msg);
  end();
});

test('getBufferFiles() with files', ({ same, end }) => {
  const msg = 'should return correct data';

  const bufferFileCount = SECONDS_TO_BUFFER * FILES_PER_SECOND;

  const initial = createState({
    files: createFileState({
      data: [...Array(bufferFileCount * 2)].map((value, i) => {
        return createFile({
          name: `${i}.json`
        });
      })
    })
  });

  const actual = selector(initial);
  const expected = initial.files.data.slice(0, bufferFileCount);

  same(actual, expected, msg);
  end();
});

test('getBufferFiles() with files offset', ({ same, end }) => {
  const msg = 'should return correct data';

  const bufferFileCount = SECONDS_TO_BUFFER * FILES_PER_SECOND;

  const initial = createState({
    files: createFileState({
      currentFileIndex: bufferFileCount,
      data: [...Array(bufferFileCount * 2)].map((value, i) => {
        return createFile({
          name: `${i}.json`
        });
      })
    })
  });

  const actual = selector(initial);
  const expected = initial.files.data.slice(bufferFileCount, bufferFileCount * 2);

  same(actual, expected, msg);
  end();
});
