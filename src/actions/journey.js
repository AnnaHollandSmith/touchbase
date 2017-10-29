import axios from 'axios';

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

export const UPDATE_DESTINATION_COORDS = 'UPDATE_DESTINATION_COORDS';
export const UPDATE_DESTINATION_NOT_SET = 'UPDATE_DESTINATION_NOT_SET';
export const checkDestinationPostcode = postcode => (dispatch) => {
  if (postcode.length > 0) {
    axios.get(`https://postcodes.io/postcodes/${postcode.replace(' ', '')}`)
      .then(({ data }) => {
        const { result } = data;
        const { latitude, longitude } = result;
        dispatch({
          type: UPDATE_DESTINATION_COORDS,
          lat: latitude,
          lng: longitude,
        });
      })
      .catch(() => dispatch({
        type: UPDATE_DESTINATION_NOT_SET,
      }));
  }
};

export const UPDATE_SELECTED_CONTACTS = 'UPDATE_SELECTED_CONTACTS';
export const updateSelectedContacts = contacts => ({
  type: UPDATE_SELECTED_CONTACTS,
  contacts,
});
