import { UPDATE_NAME, UPDATE_MOBILE_NUMBER } from '../actions/user';

const initialState = {
  name: '',
  mobileNumber: '',
  homeAddress: {
    lat: 0.0,
    long: 0.0,
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default user;
