import test from 'tape';
import reducer from 'reducers/files';
import { createFile, createFrame, createState } from 'reducers/files.factory';
import { CHANGE_SIMULATION_FRAME, CHOOSE_FILES_SUCCESS, LOAD_FILES_REQUEST, LOAD_FILES_SUCCESS } from 'actions';

test('filesReducer() with no arguments', ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer();
  const expected = createState();

  same(actual, expected, msg);
  end();
});

test(`filesReducer() with action ${CHANGE_SIMULATION_FRAME}`, ({ same, end }) => {
  const msg = 'should return correct state';
  const initial = createState({
    currentFileIndex: 1,
    currentFrameIndex: 0,
    data: new Array(2).fill(
      createFile({
        frames: Array(1).fill(createFrame()),
        status: { loaded: true }
      })
    )
  });

  const expected = createState({
    currentFileIndex: 1,
    currentFrameIndex: 1,
    previousFileIndex: 1,
    previousFrameIndex: 0,
    data: new Array(2).fill(
      createFile({
        frames: Array(1).fill(createFrame()),
        status: { loaded: true }
      })
    )
  });

  const actual = reducer(initial, { type: CHANGE_SIMULATION_FRAME, fileIndex: 1, frameIndex: 1 });

  same(actual, expected, msg);
  end();
});

test(`filesReducer() with action ${CHOOSE_FILES_SUCCESS}`, ({ same, end }) => {
  const msg = 'should return correct state';
  const date = Date().toString();
  const name = `${date}.json`;
  const files = [{ name }];

  const expected = createState({
    data: [
      createFile({
        date: new Date(date),
        frames: [null],
        geojson: null,
        name,
        raw: { name },
        status: { loaded: false, loading: false }
      })
    ]
  });

  const actual = reducer(undefined, { type: CHOOSE_FILES_SUCCESS, files });

  same(actual, expected, msg);
  end();
});

test(`filesReducer() with action ${LOAD_FILES_REQUEST}`, ({ same, end }) => {
  const msg = 'should return correct state';
  const filenames = [`${Date().toString()}-1.json`, `${Date().toString()}-2.json`];

  const initial = createState({
    data: filenames.map(name => createFile({ name }))
  });

  const expected = createState({
    data: filenames.map(name => createFile({ name, status: { loaded: false, loading: name === filenames[0] } }))
  });

  const actual = reducer(initial, { type: LOAD_FILES_REQUEST, filenames: [filenames[0]] });

  same(actual, expected, msg);
  end();
});

test(`filesReducer() with action ${LOAD_FILES_SUCCESS}`, ({ same, end }) => {
  const msg = 'should return correct state';
  const date = Date().toString();
  const name = `${date}.json`;

  const geojson = {};
  const frame = { geojson: {} };
  const files = { [name]: { geojson, frames: [frame] } };

  const initial = createState({
    data: [
      createFile({
        date: new Date(date),
        frames: [null],
        geojson: null,
        name,
        raw: { name },
        status: { loaded: false, loading: false }
      })
    ]
  });

  const expected = createState({
    data: [
      createFile({
        date: new Date(date),
        frames: [frame],
        geojson,
        name,
        raw: { name },
        status: { loaded: true, loading: false }
      })
    ]
  });

  const actual = reducer(initial, { type: LOAD_FILES_SUCCESS, files });

  same(actual, expected, msg);
  end();
});
