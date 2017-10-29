import {
  UPDATE_MODE,
  UPDATE_ORIGIN,
  UPDATE_DESTINATION_POSTCODE,
  UPDATE_DESTINATION_COORDS,
  UPDATE_DESTINATION_NOT_SET,
  UPDATE_SELECTED_CONTACTS,
  SUBMIT_JOURNEY,
  JOURNEY_NOT_IN_PROGRESS,
  JOURNEY_IN_PROGRESS,
  RESET_JOURNEY,
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
  journeyInProgress: false,
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

    case UPDATE_DESTINATION_COORDS: {
      const { lat, lng } = action;
      return {
        ...state,
        destinationSet: true,
        destination: {
          ...state.destination,
          lat,
          lng,
        },
      };
    }

    case UPDATE_DESTINATION_NOT_SET: {
      return {
        ...state,
        destinationSet: false,
      };
    }

    case UPDATE_SELECTED_CONTACTS: {
      const { contacts } = action;
      return {
        ...state,
        contacts,
      };
    }

    case SUBMIT_JOURNEY: {
      return {
        ...initialState,
        journeyInProgress: true,
      };
    }

    case JOURNEY_IN_PROGRESS: {
      return {
        ...state,
        journeyInProgress: true,
      };
    }

    case JOURNEY_NOT_IN_PROGRESS: {
      return {
        ...state,
        journeyInProgress: false,
      };
    }

    case RESET_JOURNEY: {
      return initialState;
    }

    default:
      return state;
  }
};

export default reducer;
