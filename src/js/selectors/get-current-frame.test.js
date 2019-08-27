import test from 'tape';
import selector from 'selectors/get-current-frame';
import createState from 'reducers/index.factory';
import { createFile, createFrame, createState as createFileState } from 'reducers/files.factory';

test('getCurrentFrame() with no frame', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = null;

  same(actual, expected, msg);
  end();
});

test('getCurrentFrame() with frame', ({ same, end }) => {
  const msg = 'should return correct data';

  const currentFrame = createFrame({ geojson: { features: [] } });
  const notCurrentFrame = createFrame({ geojson: { features: ['foo'] } });

  const initial = createState({
    files: createFileState({
      currentFileIndex: 0,
      currentFrameIndex: 1,
      data: new Array(1).fill(
        createFile({
          frames: [notCurrentFrame, currentFrame]
        })
      )
    })
  });

  const actual = selector(initial);
  const expected = currentFrame;

  same(actual, expected, msg);
  end();
});
