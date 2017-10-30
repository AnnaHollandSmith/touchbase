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
  checkIfJourneyInProgress,
  completeJourney,
  extendJourney,
} from '../actions/journey';
import { logout } from '../actions/user';

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
    selectedContacts: journey.contacts,
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
  checkIfJourneyInProgress: mobileNumber => dispatch(checkIfJourneyInProgress(mobileNumber)),
  handleCompleteJourney: mobileNumber => dispatch(completeJourney(mobileNumber)),
  handleExtendJourney: mobileNumber => dispatch(extendJourney(mobileNumber)),
  handleLogout: () => dispatch(logout()),
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(checksInitialized(Main));

export default MainContainer;
