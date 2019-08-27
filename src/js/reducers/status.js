import {
  LOAD_FILES_REQUEST,
  LOAD_FILES_SUCCESS,
  LOAD_FILES_FAILURE,
  PLAY_SIMULATION,
  BUFFER_SIMULATION,
  PAUSE_SIMULATION,
  STOP_SIMULATION
} from 'actions';

const initialState = {
  buffered: false,
  loading: false,
  loaded: false,
  error: null,
  playing: false
};

export default function status(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FILES_REQUEST: {
      return {
        ...state,
        ...{
          loading: true
        }
      };
    }

    case LOAD_FILES_SUCCESS: {
      return {
        ...state,
        ...{
          buffered: true,
          loading: false,
          loaded: true,
          error: null
        }
      };
    }

    case LOAD_FILES_FAILURE: {
      return {
        ...state,
        ...{
          loading: false,
          error: action.error
        }
      };
    }

    case PLAY_SIMULATION: {
      return {
        ...state,
        ...{
          playing: true
        }
      };
    }

    case BUFFER_SIMULATION: {
      return {
        ...state,
        ...{
          buffered: false
        }
      };
    }

    case PAUSE_SIMULATION: {
      return {
        ...state,
        ...{
          playing: false
        }
      };
    }
    case STOP_SIMULATION: {
      return {
        ...state,
        ...{
          playing: false
        }
      };
    }

    default:
      return state;
  }
}
