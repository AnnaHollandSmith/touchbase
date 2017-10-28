import { connect } from 'react-redux';
import { updateName, updateMobileNumber } from '../actions/user';
import Signup from '../components/Signup';

const mapStateToProps = state => ({
  name: state.user.name,
  mobileNumber: state.user.mobileNumber,
});

const mapDispatchToProps = dispatch => ({
  handleNameChange: name => dispatch(updateName(name)),
  handleMobileNumberChange: number => dispatch(updateMobileNumber(number)),
});

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

export default SignupContainer;
