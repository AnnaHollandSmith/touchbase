import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { Location, Permissions } from 'expo';
// eslint-disable-next-line
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/Main';

const {
  containerStyle,
  fieldStyle,
  labelStyle,
  buttonWrapperStyle,
  buttonTextStyle,
  buttonSelectedTextStyle,
  buttonStyle,
  buttonSelectedStyle,
  buttonCenterStyle,
  inputStyle,
} = styles;

class Main extends Component {
  componentWillMount() {
    this.getLocationAsync();
  }

  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const { coords } = await Location.getCurrentPositionAsync({});
      this.props.handleUpdateOrigin(coords);
    }
  }

  render() {
    const {
      mode,
      handleModeSelect,
      destinationPostcode,
      handleDestinationPostcodeChange,
    } = this.props;
    return (
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={containerStyle}
      >
        <View style={fieldStyle}>
          <Text style={labelStyle}>Method of Transportation</Text>
        </View>
        <View style={buttonWrapperStyle}>
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
              mode === 'car' && buttonSelectedStyle,
              buttonCenterStyle,
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
        <View style={fieldStyle}>
          <Text style={labelStyle}>Destination Postcode</Text>
        </View>
        <View style={fieldStyle}>
          <TextInput
            autocorrect={false}
            onChangeText={handleDestinationPostcodeChange}
            style={inputStyle}
            value={destinationPostcode}
          />
        </View>
      </ScrollView>
    );
  }
}

Main.defaultProps = {
  mode: '',
  destinationPostcode: '',
};

Main.propTypes = {
  mode: PropTypes.string,
  destinationPostcode: PropTypes.string,
  handleDestinationPostcodeChange: PropTypes.func.isRequired,
  handleModeSelect: PropTypes.func.isRequired,
  handleUpdateOrigin: PropTypes.func.isRequired,
};

export default Main;
