import {
  UPDATE_MODE,
  UPDATE_ORIGIN,
  UPDATE_DESTINATION_POSTCODE,
  UPDATE_DESTINATION_COORDS,
  UPDATE_DESTINATION_NOT_SET,
  UPDATE_SELECTED_CONTACTS,
  UPDATE_JOURNEY_START,
  UPDATE_JOURNEY_ETA,
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
  start: new Date(),
  eta: new Date(),
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
          lat: origin.latitude || origin.lat,
          lng: origin.longitude || origin.lng,
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

    case UPDATE_JOURNEY_START: {
      const { start } = action;
      return {
        ...state,
        start: new Date(start),
      };
    }

    case UPDATE_JOURNEY_ETA: {
      const { eta } = action;
      return {
        ...state,
        eta: new Date(eta),
      };
    }

    default:
      return state;
  }
};

export default reducer;
