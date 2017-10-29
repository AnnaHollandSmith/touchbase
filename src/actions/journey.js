import axios from 'axios';
import { Alert } from 'react-native';

export const UPDATE_JOURNEY_START = 'UPDATE_JOURNEY_START';
const updateJourneyStart = start => ({
  type: UPDATE_JOURNEY_START,
  start,
});

export const UPDATE_JOURNEY_ETA = 'UPDATE_JOURNEY_ETA';
const updateJourneyETA = eta => ({
  type: UPDATE_JOURNEY_ETA,
  eta,
});

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
const updateDestinationCoords = ({ lat, lng }) => ({
  type: UPDATE_DESTINATION_COORDS,
  lat,
  lng,
});

export const UPDATE_DESTINATION_NOT_SET = 'UPDATE_DESTINATION_NOT_SET';
const updateDestinationNotSet = () => ({
  type: UPDATE_DESTINATION_NOT_SET,
});

export const checkDestinationPostcode = postcode => (dispatch) => {
  if (postcode.length > 0) {
    axios.get(`https://postcodes.io/postcodes/${postcode.replace(' ', '')}`)
      .then(({ data }) => {
        const { result } = data;
        const { latitude, longitude } = result;
        dispatch(updateDestinationCoords({
          lat: latitude,
          lng: longitude,
        }));
      })
      .catch(() => dispatch(updateDestinationNotSet()));
  }
};

export const UPDATE_SELECTED_CONTACTS = 'UPDATE_SELECTED_CONTACTS';
export const updateSelectedContacts = contacts => ({
  type: UPDATE_SELECTED_CONTACTS,
  contacts,
});

export const JOURNEY_NOT_IN_PROGRESS = 'JOURNEY_NOT_IN_PROGRESS';
const journeyNotInProgress = () => ({
  type: JOURNEY_NOT_IN_PROGRESS,
});

export const JOURNEY_IN_PROGRESS = 'JOURNEY_IN_PROGRESS';
const journeyInProgress = () => ({
  type: JOURNEY_IN_PROGRESS,
});
export const checkIfJourneyInProgress = mobileNumber => dispatch => (
  axios.get(`https://touchbaseapp.herokuapp.com/journeys/${mobileNumber}`)
    .then(({ data }) => {
      dispatch(journeyInProgress());
      dispatch(updateOrigin(data.origin));
      dispatch(updateMode(data.mode));
      dispatch(updateDestinationCoords(data.destination));
      dispatch(updateSelectedContacts(data.contacts));
      dispatch(updateJourneyStart(data.start));
      dispatch(updateJourneyETA(data.eta));
    })
    .catch(() => dispatch(journeyNotInProgress()))
);

export const RESET_JOURNEY = 'RESET_JOURNEY';
const resetJourney = () => ({
  type: RESET_JOURNEY,
});

export const completeJourney = mobileNumber => dispatch =>
  axios.post(
    'https://touchbaseapp.herokuapp.com/journeys/terminate',
    { mobileNumber },
  )
    .then(() => {
      dispatch(resetJourney());
      Alert.alert('Hooray!', 'Glad you made it home safely!');
    })
    .catch(err => console.log(err));

export const extendJourney = mobileNumber => () =>
  axios.post(
    'https://touchbaseapp.herokuapp.com/journeys/extend',
    { mobileNumber },
  )
    .then(({ data }) => {
      const { message } = data;
      Alert.alert('No Problem!', message);
    })
    .catch(err => console.log(err));

export const submitJourney = journey => (dispatch) => {
  const {
    destinationSet,
    originSet,
    destination,
    start,
    eta,
    ...restJourney
  } = journey;
  const { postcode, ...restDestination } = destination;
  const payload = {
    ...restJourney,
    destination: restDestination,
  };
  return axios.post('https://touchbaseapp.herokuapp.com/journeys', payload)
    .then(({ data }) => {
      dispatch(journeyInProgress());
      dispatch(updateOrigin(data.origin));
      dispatch(updateMode(data.mode));
      dispatch(updateDestinationCoords(data.destination));
      dispatch(updateSelectedContacts(data.contacts));
      dispatch(updateJourneyStart(data.start));
      dispatch(updateJourneyETA(data.eta));
      Alert.alert('Success!', 'Your journey has been created');
    })
    .catch(err => console.log(err));
};
