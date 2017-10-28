import { connect } from 'react-redux';
import App from '../components';

const mapStateToProps = state => ({
  user: state.user,
});

const Root = connect(mapStateToProps)(App);

export default Root;
