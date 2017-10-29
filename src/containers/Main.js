import { connect } from 'react-redux';
import checksInitialized from '../hocs/checksInitialized';
import Main from '../components/Main';
import { updateContacts } from '../actions/contacts';
import {
  updateMode,
  updateOrigin,
  updateDestinationPostcode,
  checkDestinationPostcode,
  updateSelectedContacts,
  submitJourney,
} from '../actions/journey';

const mapStateToProps = (state) => {
  const { user, journey, contacts } = state;
  const { mode, destination } = journey;
  return ({
    initialized: user.initialized,
    mobileNumber: user.mobileNumber,
    mode,
    destinationPostcode: destination.postcode,
    contacts,
    journey,
  });
};

const mapDispatchToProps = dispatch => ({
  handleModeSelect: mode => dispatch(updateMode(mode)),
  handleUpdateOrigin: origin => dispatch(updateOrigin(origin)),
  handleGetContacts: contacts => dispatch(updateContacts(contacts)),
  handleDestinationPostcodeChange: postcode => dispatch(updateDestinationPostcode(postcode)),
  checkDestinationPostcode: postcode => dispatch(checkDestinationPostcode(postcode)),
  handleUpdateSelectedContacts: contacts => dispatch(updateSelectedContacts(contacts)),
  handleSubmit: journey => dispatch(submitJourney(journey)),
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(checksInitialized(Main));

export default MainContainer;
