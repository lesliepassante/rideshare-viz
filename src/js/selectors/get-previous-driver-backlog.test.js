import test from 'tape';
import selector from 'selectors/get-previous-driver-backlog';
import createState from 'reducers/index.factory';
import createDriverState from 'reducers/driver.factory';
import { createFile, createState as createFileState } from 'reducers/files.factory';

test('getPreviousDriverBacklog() with no driver', ({ same, end }) => {
  const msg = 'should return correct data';

  const initial = createState();

  const actual = selector(initial);
  const expected = [];

  same(actual, expected, msg);
  end();
});

test('getPreviousDriverBacklog() with driver and no backlog', ({ same, end }) => {
  const msg = 'should return correct data';

  const driverId = 1;

  const initial = createState({
    driver: createDriverState({ currentId: driverId })
  });

  const actual = selector(initial);
  const expected = [];

  same(actual, expected, msg);
  end();
});

test('getPreviousDriverBacklog() with driver and backlog', ({ same, end }) => {
  const msg = 'should return correct data';

  const driverId = 1;
  const backlogFeatures = [
    {
      properties: {
        driverId,
        type: '+'
      }
    },
    {
      properties: {
        driverId,
        type: '-'
      }
    }
  ];

  const nonBacklogFeatures = [
    {
      properties: {
        driverId,
        type: '++'
      }
    },
    {
      properties: {
        driverId: 'foo',
        type: '-'
      }
    }
  ];

  const initial = createState({
    driver: createDriverState({ currentId: driverId }),
    files: createFileState({
      currentFileIndex: 2,
      currentFrameIndex: 0,
      previousFileIndex: 1,
      previousFrameIndex: 0,
      data: [
        createFile(),
        createFile({
          geojson: { features: backlogFeatures.concat(nonBacklogFeatures) }
        }),
        createFile()
      ]
    })
  });

  const actual = selector(initial);
  const expected = backlogFeatures;

  same(actual, expected, msg);
  end();
});
