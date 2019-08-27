import test from 'tape';
import selector from 'selectors/get-unloaded-buffer-files';
import createState from 'reducers/index.factory';
import { createFile, createState as createFileState } from 'reducers/files.factory';
import { FILES_PER_SECOND, SECONDS_TO_BUFFER } from 'utils/constants';

test('getUnloadedBufferFiles() with no frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = [];

  same(actual, expected, msg);
  end();
});

test('getUnloadedBufferFiles() with more than enough frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const filesToBuffer = SECONDS_TO_BUFFER * FILES_PER_SECOND;

  const files = [...new Array(filesToBuffer * 2)].map((file, i) => {
    return createFile({ name: `${i}.json` });
  });

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: 0,
      data: files
    })
  });

  const actual = selector(initial);
  const expected = files.slice(0, filesToBuffer);

  same(actual, expected, msg);
  end();
});

test('getUnloadedBufferFiles() with less than enough frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const filesToBuffer = SECONDS_TO_BUFFER * FILES_PER_SECOND;

  const files = [...new Array(filesToBuffer - 1)].map((file, i) => {
    return createFile({ name: `${i}.json` });
  });

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: 0,
      data: files
    })
  });

  const actual = selector(initial);
  const expected = files.slice(0, filesToBuffer - 1);

  same(actual, expected, msg);
  end();
});
