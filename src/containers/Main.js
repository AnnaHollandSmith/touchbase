import { connect } from 'react-redux';
import checksInitialized from '../hocs/checksInitialized';
import Main from '../components/Main';
import { updateMode, updateOrigin } from '../actions/journey';
import { updateContacts } from '../actions/contacts';

const mapStateToProps = (state) => {
  const { user, journey } = state;
  const { mode } = journey;
  return ({
    initialized: user.initialized,
    mode,
  });
};

const mapDispatchToProps = dispatch => ({
  handleModeSelect: mode => dispatch(updateMode(mode)),
  handleUpdateOrigin: origin => dispatch(updateOrigin(origin)),
  handleGetContacts: contacts => dispatch(updateContacts(contacts)),
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(checksInitialized(Main));

export default MainContainer;
