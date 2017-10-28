import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TextInput } from 'react-native';

const Signup = ({ handleMobileNumberChange, handleNameChange, mobileNumber, name }) => (
  <ScrollView
    scrollEnabled={false}
    contentContainerStyle={styles.containerStyle}
  >
    <View style={styles.fieldStyle}>
      <Text style={styles.labelStyle}>Name</Text>
      <TextInput
        autocorrect={false}
        onChangeText={handleNameChange}
        style={styles.inputStyle}
        value={name}
      />
    </View>
    <View style={styles.fieldStyle}>
      <Text style={styles.labelStyle}>Mobile Number</Text>
      <TextInput
        autocorrect={false}
        onChangeText={handleMobileNumberChange}
        style={styles.inputStyle}
        value={mobileNumber}
        keyboardType="phone-pad"
      />
    </View>
  </ScrollView>
);

Signup.defaultProps = {
  name: '',
  mobileNumber: '',
};

Signup.propTypes = {
  mobileNumber: PropTypes.string,
  name: PropTypes.string,
  handleNameChange: PropTypes.func.isRequired,
  handleMobileNumberChange: PropTypes.func.isRequired,
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: 'raleway-regular',
    fontSize: 18,
    lineHeight: 23,
    borderWidth: 1,
    borderColor: '#000',
    flex: 2,
  },
  labelStyle: {
    flex: 1,
    fontFamily: 'raleway-regular',
    fontSize: 18,
  },
  fieldStyle: {
    alignItems: 'center',
    // height: 40,
    flexDirection: 'row',
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
};

export default Signup;
