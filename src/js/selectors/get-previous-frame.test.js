import test from 'tape';
import selector from 'selectors/get-previous-frame';
import createState from 'reducers/index.factory';
import { createFile, createFrame, createState as createFileState } from 'reducers/files.factory';

test('getPreviousFrame() with no frame', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = null;

  same(actual, expected, msg);
  end();
});

test('getPreviousFrame() with frame', ({ same, end }) => {
  const msg = 'should return correct data';

  const currentFrame = createFrame({ geojson: { features: [] } });
  const previousFrame = createFrame({ geojson: { features: ['foo'] } });

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: 1,
      data: new Array(1).fill(
        createFile({
          frames: [previousFrame, currentFrame]
        })
      )
    })
  });

  const actual = selector(initial);
  const expected = previousFrame;

  same(actual, expected, msg);
  end();
});
