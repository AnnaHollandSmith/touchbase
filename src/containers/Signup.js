import { connect } from 'react-redux';
import { updateName, updateMobileNumber, submitUserDetails } from '../actions/user';
import Signup from '../components/Signup';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleNameChange: name => dispatch(updateName(name)),
  handleMobileNumberChange: number => dispatch(updateMobileNumber(number)),
  submitUser: user => dispatch(submitUserDetails(user)),
});

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

export default SignupContainer;
