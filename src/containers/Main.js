import { connect } from 'react-redux';
import checksInitialized from '../hocs/checksInitialized';
import Main from '../components/Main';
import { updateMode, updateOrigin } from '../actions/journey';

const mapStateToProps = (state) => {
  const { user, journey } = state;
  const { mode } = journey;
  console.log(journey);
  return ({
    initialized: user.initialized,
    mode,
  });
};

const mapDispatchToProps = dispatch => ({
  handleModeSelect: mode => dispatch(updateMode(mode)),
  handleUpdateOrigin: origin => dispatch(updateOrigin(origin)),
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(checksInitialized(Main));

export default MainContainer;
