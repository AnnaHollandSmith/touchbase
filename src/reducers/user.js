import { UPDATE_NAME, UPDATE_MOBILE_NUMBER, INITIALIZE_USER, RESET_USER } from '../actions/user';

const initialState = {
  initialized: false,
  name: '',
  mobileNumber: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_USER: {
      const { user } = action;
      const { name, mobileNumber } = user;
      return {
        ...state,
        initialized: true,
        name,
        mobileNumber,
      };
    }

    case UPDATE_NAME: {
      const { name } = action;
      return {
        ...state,
        name,
      };
    }

    case UPDATE_MOBILE_NUMBER: {
      const { mobileNumber } = action;
      return {
        ...state,
        mobileNumber,
      };
    }

    case RESET_USER: {
      return initialState;
    }

    default:
      return state;
  }
};

export default reducer;
