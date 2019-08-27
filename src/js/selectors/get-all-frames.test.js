import test from 'tape';
import selector from 'selectors/get-all-frames';
import createState from 'reducers/index.factory';
import { createFile, createFrame, createState as createFileState } from 'reducers/files.factory';

test('getAllFrames() with no frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = [];

  same(actual, expected, msg);
  end();
});

test('getAllFrames() with frames', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState({
    files: createFileState({ data: new Array(2).fill(createFile({ frames: new Array(2).fill(createFrame()) })) })
  });

  const actual = selector(initial);
  const expected = new Array(4).fill(createFrame());

  same(actual, expected, msg);
  end();
});
