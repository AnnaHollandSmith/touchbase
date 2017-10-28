import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import colours from '../constants/colours';

const logo = require('../../assets/images/touchbase.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'raleway-regular',
  },
});

const App = props => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.user.name}</Text>
  </View>
);

App.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default App;

