import axios from 'axios';

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

export const SUBMIT_USER_DETAILS = 'SUBMIT_USER_DETAILS';
export const submitUserDetails = user => dispatch =>
  axios.post('https://touchbaseapp.herokuapp.com/create', user)
    .then((data) => {
      dispatch({
        type: SUBMIT_USER_DETAILS,
      });
      console.log(data);
    })
    .catch(err => console.log(err, 'marlon'));
