const initialState = {
  name: 'User',
  mobileNumber: '',
  homeAddress: {
    lat: 0.0,
    long: 0.0,
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default user;
