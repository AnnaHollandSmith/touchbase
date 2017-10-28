import { combineReducers } from 'redux';

const initialState = {
  hello: 'Hello World',
};

const helloReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducer = combineReducers({
  reducer: helloReducer,
});

export default reducer;
