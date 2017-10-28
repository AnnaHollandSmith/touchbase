import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/Main';

const {
  containerStyle,
  fieldStyle,
  labelStyle,
  buttonStyleWrapper,
  buttonTextStyle,
  buttonSelectedTextStyle,
  buttonStyle,
  buttonSelectedStyle,
  buttonCenterStyle,
} = styles;

const Main = ({ mode, handleModeSelect }) => (
  <ScrollView
    scrollEnabled={false}
    contentContainerStyle={containerStyle}
  >
    <View style={fieldStyle}>
      <Text style={labelStyle}>Method of transportation</Text>
    </View>
    <View style={buttonStyleWrapper}>
      <TouchableOpacity
        onPress={() => handleModeSelect('walking')}
        style={[
          buttonStyle,
          mode === 'walking' && buttonSelectedStyle,
        ]}
      >
        <Ionicons
          name="md-walk"
          style={[
            buttonTextStyle,
            (mode === 'walking') && buttonSelectedTextStyle,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleModeSelect('car')}
        style={[
          buttonStyle,
          buttonCenterStyle,
          mode === 'car' && buttonSelectedStyle,
        ]}
      >
        <Ionicons
          name="md-car"
          style={[
            buttonTextStyle,
            (mode === 'car') && buttonSelectedTextStyle,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleModeSelect('transit')}
        style={[
          buttonStyle,
          mode === 'transit' && buttonSelectedStyle,
        ]}
      >
        <Ionicons
          name="md-bus"
          style={[
            buttonTextStyle,
            (mode === 'transit') && buttonSelectedTextStyle,
          ]}
        />
      </TouchableOpacity>
    </View>
  </ScrollView>
);

Main.defaultProps = {
  mode: '',
};

Main.propTypes = {
  mode: PropTypes.string,
  handleModeSelect: PropTypes.func.isRequired,
};

export default Main;
