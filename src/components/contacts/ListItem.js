import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class ListItem extends PureComponent {
  onPress = () => {
    this.props.onItemPress({
      name: this.props.name,
      phoneNumber: this.props.phoneNumber,
    });
  }
  render() {
    const {
      name,
      phoneNumber,
    } = this.props;

    return (
      <View>
        <TouchableOpacity
          onPress={this.onPress}
        >
          <Text>{name}</Text>
          <Text>{phoneNumber}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onItemPress: PropTypes.func.isRequired,
};

export default ListItem;
