import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Contacts, Location, Permissions } from 'expo';
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import uuid from 'uuid';
import { map, isEmpty } from 'ramda';
// eslint-disable-next-line
import { Ionicons } from '@expo/vector-icons';

import ContactsList from './contacts/List';
import styles from '../styles/Main';

const invalidJourney = (journey) => {
  const returnValue = (
    isEmpty(journey.mode) ||
    !journey.destinationSet ||
    !journey.originSet ||
    isEmpty(journey.contacts)
  );

  return returnValue;
};

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
  buttonFullWidthStyle,
  contactViewStyle,
  fieldMarginBottomStyle,
  buttonDisabledStyle,
  buttonTextDisabledStyle,
  buttonPacificoTextStyle,
  extendButtonStyle,
  buttonPacificoStyle,
} = styles;

class Main extends Component {
  constructor() {
    super();

    this.state = {
      showContacts: false,
    };

    this.handleCloseContacts = this.handleCloseContacts.bind(this);
    this.handleOpenContacts = this.handleOpenContacts.bind(this);
  }

  componentWillMount() {
    const {
      checkIfJourneyInProgress,
      mobileNumber,
    } = this.props;
    this.getLocationAsync();
    this.getContactsAsync();
    checkIfJourneyInProgress(mobileNumber);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.journey.originSet && this.props.journey.originSet) {
      this.getLocationAsync();
    }
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
      pageSize: 1000,
    });

    this.props.handleGetContacts(data);
  }

  handleCloseContacts(contacts) {
    this.props.handleUpdateSelectedContacts(contacts);
    this.setState({
      showContacts: false,
    });
  }

  handleOpenContacts() {
    this.setState({
      showContacts: true,
    });
  }

  renderCorrectScreen() {
    const {
      mode,
      handleModeSelect,
      destinationPostcode,
      handleDestinationPostcodeChange,
      checkDestinationPostcode,
      contacts,
      journey,
      mobileNumber,
      handleSubmit,
      selectedContacts,
      handleCompleteJourney,
      handleExtendJourney,
    } = this.props;

    return !journey.journeyInProgress ?
      <View style={containerStyle}>
        <View style={buttonWrapperStyle}>
          <TouchableOpacity
            onPress={() => handleExtendJourney(mobileNumber)}
            style={[
              buttonStyle,
              buttonFullWidthStyle,
              extendButtonStyle,
            ]}
          >
            <Text style={buttonTextStyle}>
              Extend journey
            </Text>
          </TouchableOpacity>
        </View>
        <View style={buttonWrapperStyle}>
          <TouchableOpacity
            onPress={() => handleCompleteJourney(mobileNumber)}
            style={[
              buttonStyle,
              buttonFullWidthStyle,
              buttonPacificoStyle,
            ]}
          >
            <Text
              style={[
                buttonTextStyle,
                buttonPacificoTextStyle,
              ]}
            >
              TouchBase
            </Text>
          </TouchableOpacity>
        </View>
      </View> :
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
        <View
          style={[
            fieldStyle,
            selectedContacts.length !== 0 && fieldMarginBottomStyle,
          ]}
        >
          <Text style={labelStyle}>Contacts</Text>
        </View>
        {
          map(contact => (
            <View
              key={`selectedContact--${uuid()}`}
              style={contactViewStyle}
            >
              <Text style={labelStyle}>{contact.name}</Text>
            </View>
          ), selectedContacts)
        }
        <View style={buttonWrapperStyle}>
          <TouchableOpacity
            onPress={this.handleOpenContacts}
            style={[buttonStyle, buttonFullWidthStyle]}
          >
            <Text
              style={styles.buttonTextStyle}
            >
              Add Contacts
            </Text>
          </TouchableOpacity>
        </View>
        <View style={buttonWrapperStyle}>
          <TouchableOpacity
            onPress={() => handleSubmit({ ...journey, mobileNumber })}
            style={[
              buttonStyle,
              buttonFullWidthStyle,
              invalidJourney(journey) && buttonDisabledStyle,
            ]}
            disabled={invalidJourney(journey)}
          >
            <Text
              style={[
                buttonTextStyle,
                invalidJourney(journey) && buttonTextDisabledStyle,
              ]}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
        <ContactsList
          contacts={contacts}
          visible={this.state.showContacts}
          handleClose={this.handleCloseContacts}
          selectedContacts={selectedContacts}
        />
      </ScrollView>;
  }

  render() {
    return (
      this.renderCorrectScreen()
    );
  }
}

Main.defaultProps = {
  mode: '',
  destinationPostcode: '',
  contacts: [],
  mobileNumber: '',
  selectedContacts: [],
};

Main.propTypes = {
  mode: PropTypes.string,
  destinationPostcode: PropTypes.string,
  handleDestinationPostcodeChange: PropTypes.func.isRequired,
  handleModeSelect: PropTypes.func.isRequired,
  handleUpdateOrigin: PropTypes.func.isRequired,
  handleGetContacts: PropTypes.func.isRequired,
  checkDestinationPostcode: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    mobileNumber: PropTypes.string,
  })),
  mobileNumber: PropTypes.string,
  journey: PropTypes.shape().isRequired,
  handleUpdateSelectedContacts: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  selectedContacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    mobileNumber: PropTypes.string,
  })),
  checkIfJourneyInProgress: PropTypes.func.isRequired,
  handleCompleteJourney: PropTypes.func.isRequired,
  handleExtendJourney: PropTypes.func.isRequired,
};

export default Main;
