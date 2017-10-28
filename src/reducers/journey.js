import {
  UPDATE_MODE,
  UPDATE_ORIGIN,
  UPDATE_DESTINATION_POSTCODE,
} from '../actions/journey';

const initialState = {
  originSet: false,
  origin: {
    lat: 53.4773,
    lng: 2.2550,
  },
  destinationSet: false,
  destination: {
    lat: 0.0,
    lng: 0.0,
    postcode: '',
  },
  mode: '',
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

    case UPDATE_ORIGIN: {
      const { origin } = action;
      return {
        ...state,
        originSet: true,
        origin: {
          ...state.origin,
          lat: origin.latitude,
          lng: origin.longitude,
        },
      };
    }

    case UPDATE_DESTINATION_POSTCODE: {
      const { postcode } = action;
      return {
        ...state,
        destination: {
          ...state.destination,
          postcode,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
