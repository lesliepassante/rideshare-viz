import test from 'tape';
import reducer from 'reducers/status';
import createState from 'reducers/status.factory';
import {
  LOAD_FILES_REQUEST,
  LOAD_FILES_SUCCESS,
  LOAD_FILES_FAILURE,
  PLAY_SIMULATION,
  PAUSE_SIMULATION,
  STOP_SIMULATION,
  BUFFER_SIMULATION
} from 'actions';

test('statusReducer() with no arguments', ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer();
  const expected = createState();

  same(actual, expected, msg);
  end();
});

test(`statusReducer() with action ${LOAD_FILES_REQUEST}`, ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer(undefined, { type: LOAD_FILES_REQUEST });
  const expected = createState({ loading: true });

  same(actual, expected, msg);
  end();
});

test(`statusReducer() with action ${LOAD_FILES_SUCCESS}`, ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer(undefined, { type: LOAD_FILES_SUCCESS });
  const expected = createState({ buffered: true, loading: false, loaded: true, error: null });

  same(actual, expected, msg);
  end();
});

test(`statusReducer() with action ${LOAD_FILES_FAILURE}`, ({ same, end }) => {
  const msg = 'should return correct state';
  const error = 'this is broken';

  const actual = reducer(undefined, { type: LOAD_FILES_FAILURE, error });
  const expected = createState({
    loading: false,
    error
  });

  same(actual, expected, msg);
  end();
});

test(`statusReducer() with action ${PLAY_SIMULATION}`, ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer(undefined, { type: PLAY_SIMULATION });
  const expected = createState({ playing: true });

  same(actual, expected, msg);
  end();
});

test(`statusReducer() with action ${PAUSE_SIMULATION}`, ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer(undefined, { type: PAUSE_SIMULATION });
  const expected = createState({ playing: false });

  same(actual, expected, msg);
  end();
});

test(`statusReducer() with action ${STOP_SIMULATION}`, ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer(undefined, { type: STOP_SIMULATION });
  const expected = createState({ playing: false });

  same(actual, expected, msg);
  end();
});

test(`statusReducer() with action ${BUFFER_SIMULATION}`, ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer(undefined, { type: BUFFER_SIMULATION });
  const expected = createState({ buffered: false });

  same(actual, expected, msg);
  end();
});
