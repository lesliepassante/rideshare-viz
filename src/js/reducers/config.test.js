import test from 'tape';
import reducer from 'reducers/config';
import createState from 'reducers/config.factory';
import { LOAD_CONFIG_SUCCESS } from 'actions';

test('configReducer() with no arguments', ({ same, end }) => {
  const msg = 'should return correct state';

  const actual = reducer();
  const expected = createState();

  same(actual, expected, msg);
  end();
});

test(`configReducer() with action ${LOAD_CONFIG_SUCCESS}`, ({ same, end }) => {
  const msg = 'should return correct state';

  const config = { MAPBOX_ACCESS_TOKEN: 'foo', MAPBOX_STYLE: 'bar ' };
  const actual = reducer({}, { type: LOAD_CONFIG_SUCCESS, config });
  const expected = createState(config);

  same(actual, expected, msg);
  end();
});
