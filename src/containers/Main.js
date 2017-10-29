import { connect } from 'react-redux';
import checksInitialized from '../hocs/checksInitialized';
import Main from '../components/Main';
import {
  updateMode,
  updateOrigin,
  updateDestinationPostcode,
  checkDestinationPostcode,
} from '../actions/journey';

const mapStateToProps = (state) => {
  const { user, journey } = state;
  const { mode, destination } = journey;
  return ({
    initialized: user.initialized,
    mode,
    destinationPostcode: destination.postcode,
  });
};

const mapDispatchToProps = dispatch => ({
  handleModeSelect: mode => dispatch(updateMode(mode)),
  handleUpdateOrigin: origin => dispatch(updateOrigin(origin)),
  handleDestinationPostcodeChange: postcode => dispatch(updateDestinationPostcode(postcode)),
  checkDestinationPostcode: postcode => dispatch(checkDestinationPostcode(postcode)),
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(checksInitialized(Main));

export default MainContainer;
