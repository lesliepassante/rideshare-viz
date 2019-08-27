import test from 'tape';
import reducer from 'reducers/driver';
import createState from 'reducers/driver.factory';
import { SELECT_DRIVER, DESELECT_DRIVER } from 'actions';

test('driverReducer() with no arguments', ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer();
  const expected = createState();

  same(actual, expected, msg);
  end();
});

test(`driverReducer() with action ${SELECT_DRIVER}`, ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer({}, { type: SELECT_DRIVER, driverId: 1 });
  const expected = createState({ currentId: 1 });

  same(actual, expected, msg);
  end();
});

test(`driverReducer() with action ${DESELECT_DRIVER}`, ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer(undefined, { type: DESELECT_DRIVER });
  const expected = createState();

  same(actual, expected, msg);
  end();
});
