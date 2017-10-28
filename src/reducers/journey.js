import { UPDATE_MODE } from '../actions/journey';

const initialState = {
  origin: {
    lat: 0.0,
    long: 0.0,
  },
  destination: {
    lat: 0.0,
    long: 0.0,
  },
  mode: 'car',
  contacts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MODE: {
      const { mode } = action;
      return {
        ...state,
        mode,
      };
    }
    default:
      return state;
  }
};

export default reducer;
