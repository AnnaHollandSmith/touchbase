import { connect } from 'react-redux';
import checksInitialized from '../hocs/checksInitialized';
import Main from '../components/Main';
import { updateContacts } from '../actions/contacts';
import {
  updateMode,
  updateOrigin,
  updateDestinationPostcode,
  checkDestinationPostcode,
} from '../actions/journey';

const mapStateToProps = (state) => {
  const { user, journey, contacts } = state;
  const { mode, destination } = journey;

  return ({
    initialized: user.initialized,
    mode,
    destinationPostcode: destination.postcode,
    contacts,
  });
};

const mapDispatchToProps = dispatch => ({
  handleModeSelect: mode => dispatch(updateMode(mode)),
  handleUpdateOrigin: origin => dispatch(updateOrigin(origin)),
  handleGetContacts: contacts => dispatch(updateContacts(contacts)),
  handleDestinationPostcodeChange: postcode => dispatch(updateDestinationPostcode(postcode)),
  checkDestinationPostcode: postcode => dispatch(checkDestinationPostcode(postcode)),
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(checksInitialized(Main));

export default MainContainer;
