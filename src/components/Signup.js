import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from '../styles/Signup';

const Signup = ({
  handleMobileNumberChange,
  handleNameChange,
  submitUser,
  // mobileNumber,
  // name,
  user,
}) => (
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
        value={user.name}
      />
    </View>
    <View style={styles.fieldStyle}>
      <Text style={styles.labelStyle}>Mobile Number</Text>
      <TextInput
        autocorrect={false}
        onChangeText={handleMobileNumberChange}
        style={styles.inputStyle}
        value={user.mobileNumber}
        keyboardType="phone-pad"
      />
    </View>
    <View style={styles.buttonStyleWrapper}>
      <TouchableOpacity onPress={() => user.name && user.mobileNumber && submitUser(user)} style={styles.buttonStyle}>
        <Text
          style={styles.buttonTextStyle}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

Signup.propTypes = {
  handleMobileNumberChange: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  submitUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    mobileNumber: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Signup;
