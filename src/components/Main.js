import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Contacts, Location, Permissions } from 'expo';
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
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
    this.getContactsAsync();
  }

  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') return;

    const { coords } = await Location.getCurrentPositionAsync({});

    this.props.handleUpdateOrigin(coords);
  }

  async getContactsAsync() {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status !== 'granted') return;

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.PHONE_NUMBERS],
    });

    this.props.handleGetContacts(data);
  }

  render() {
    const {
      mode,
      handleModeSelect,
      destinationPostcode,
      handleDestinationPostcodeChange,
      checkDestinationPostcode,
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
            autoCorrect={false}
            onChangeText={handleDestinationPostcodeChange}
            onBlur={() => checkDestinationPostcode(destinationPostcode)}
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
  handleGetContacts: PropTypes.func.isRequired,
  checkDestinationPostcode: PropTypes.func.isRequired,
};

export default Main;
