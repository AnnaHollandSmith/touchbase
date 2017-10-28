import { connect } from 'react-redux';
import App from '../components';

const mapStateToProps = state => ({
  text: state.reducer.hello,
});

const Root = connect(
  mapStateToProps,
)(App);

export default Root;