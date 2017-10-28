import { connect } from 'react-redux';
import checksInitialized from '../hocs/checksInitialized';
import Main from '../components/Main';
import { updateMode } from '../actions/journey';

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
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(checksInitialized(Main));

export default MainContainer;
