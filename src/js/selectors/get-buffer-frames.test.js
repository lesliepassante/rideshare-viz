import test from 'tape';
import selector from 'selectors/get-buffer-frames';
import createState from 'reducers/index.factory';
import { createFile, createFrame, createState as createFileState } from 'reducers/files.factory';
import { FILES_PER_SECOND, SECONDS_TO_BUFFER } from 'utils/constants';

test('getBufferFrames() with no files', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = [];

  same(actual, expected, msg);
  end();
});

test('getBufferFrames() with frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const bufferFileCount = SECONDS_TO_BUFFER * FILES_PER_SECOND;

  const frames = new Array(bufferFileCount).fill(createFrame());

  const initial = createState({
    files: createFileState({
      data: [...Array(bufferFileCount * 2)].map((file, i) => {
        return createFile({
          name: `${i}.json`,
          frames: [frames[i]]
        });
      })
    })
  });

  const actual = selector(initial);
  const expected = frames.slice(0, bufferFileCount);

  same(actual, expected, msg);
  end();
});
