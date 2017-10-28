// import axios from 'axios';

export const UPDATE_MODE = 'UPDATE_MODE';
export const updateMode = mode => ({
  type: UPDATE_MODE,
  mode,
});

export const UPDATE_ORIGIN = 'UPDATE_ORIGIN';
export const updateOrigin = origin => ({
  type: UPDATE_ORIGIN,
  origin,
});

export const UPDATE_DESTINATION_POSTCODE = 'UPDATE_DESTINATION_POSTCODE';
export const updateDestinationPostcode = postcode => ({
  type: UPDATE_DESTINATION_POSTCODE,
  postcode,
});
