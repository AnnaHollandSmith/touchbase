import axios from 'axios';
import { SecureStore } from 'expo';

export const UPDATE_NAME = 'UPDATE_NAME';
export const updateName = name => ({
  type: UPDATE_NAME,
  name,
});

export const UPDATE_MOBILE_NUMBER = 'UPDATE_MOBILE_NUMBER';
export const updateMobileNumber = mobileNumber => ({
  type: UPDATE_MOBILE_NUMBER,
  mobileNumber,
});

export const INITIALIZE_USER = 'INITIALIZE_USER';
const initializeUser = user => ({
  type: INITIALIZE_USER,
  user,
});

export const SUBMIT_USER_DETAILS = 'SUBMIT_USER_DETAILS';
export const submitUserDetails = user => dispatch =>
  axios.post('https://touchbaseapp.herokuapp.com/users', user)
    .then(({ data }) => {
      SecureStore.setItemAsync('user', JSON.stringify(data));
      dispatch(initializeUser(data));
    })
    .catch(err => console.log(err));

export const CHECK_USER_INITIALIZED = 'CHECK_USER_INITIALIZED';
export const checkUserInitialized = () => (dispatch) => {
  SecureStore.getItemAsync('user')
    .then(user => user && dispatch(initializeUser(JSON.parse(user))))
    .catch(err => console.log(err));
};
