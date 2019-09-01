import { LOAD_CONFIG_SUCCESS } from 'actions';

const initialState = {
  MAPBOX_ACCESS_TOKEN: null,
  MAPBOX_STYLE: null
};

export default function config(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CONFIG_SUCCESS: {
      return {
        ...state,
        ...action.config
      };
    }

    default:
      return state;
  }
}
