/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Modal, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { reject, equals, contains } from 'ramda';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import ListItem from './ListItem';
import styles from '../../styles/List';

const {
  containerStyle,
  touchableOpacityStyle,
  textStyle,
  viewListStyle,
} = styles;

const toggle = (item, selection) => (
  contains(item, selection) ?
  reject(x => equals(x, item), selection) :
  [...selection, item]
);

class ContactsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedContacts: this.props.selectedContacts,
    };
    this.handlePressedItem = this.handlePressedItem.bind(this);
  }

  handlePressedItem = (item) => {
    const selectedContacts = toggle(item, this.state.selectedContacts);

    this.setState({
      selectedContacts,
    });
  }

  renderItem = ({ item }) => {
    const { selectedContacts } = this.state;
    return (
      <ListItem
        name={item.name || ''}
        mobileNumber={item.mobileNumber || ''}
        onItemPress={this.handlePressedItem}
        inSelected={contains(item, selectedContacts)}
      />
    );
  }

  render() {
    const { visible, contacts, handleClose } = this.props;
    return (
      <Modal
        visible={visible}
        animationType="slide"
      >
        <View style={containerStyle}>
          <View style={viewListStyle}>
            <FlatList
              data={contacts}
              renderItem={this.renderItem}
              keyExtractor={() => uuid()}
            />
          </View>
          <TouchableOpacity
            onPress={() => handleClose(this.state.selectedContacts)}
            style={touchableOpacityStyle}
          >
            <Text
              style={textStyle}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

ContactsList.defaultProps = {
  contacts: [],
  selectedContacts: [],
};

ContactsList.propTypes = {
  visible: PropTypes.bool.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    mobileNumber: PropTypes.string,
  })),
  handleClose: PropTypes.func.isRequired,
  selectedContacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    mobileNumber: PropTypes.string,
  })),
};

export default ContactsList;
