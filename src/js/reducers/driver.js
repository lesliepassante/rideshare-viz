import { SELECT_DRIVER, DESELECT_DRIVER } from 'actions';

const initialState = {
  currentId: null
};

export default function driver(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_DRIVER: {
      return {
        ...state,
        ...{
          currentId: action.driverId
        }
      };
    }

    case DESELECT_DRIVER: {
      return {
        ...state,
        ...{
          currentId: null
        }
      };
    }

    default:
      return state;
  }
}
