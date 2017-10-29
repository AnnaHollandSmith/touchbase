/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Modal, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { reject, equals, contains } from 'ramda';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

const toggle = (item, selection) => (
  contains(item, selection) ?
  reject(x => equals(x, item), selection) :
  [...selection, item]
);

class ContactsList extends Component {
  constructor() {
    super();

    this.state = {
      selectedContacts: [],
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
    return (
      <ListItem
        name={item.name || ''}
        mobileNumber={item.mobileNumber || ''}
        onItemPress={this.handlePressedItem}
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
        <View>
          <FlatList
            data={contacts}
            renderItem={this.renderItem}
            keyExtractor={item => item.mobileNumber}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => handleClose(this.state.selectedContacts)}
          >
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

ContactsList.defaultProps = {
  contacts: [],
};

ContactsList.propTypes = {
  visible: PropTypes.bool.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    mobileNumber: PropTypes.string,
  })),
  handleClose: PropTypes.func.isRequired,
};

export default ContactsList;
