import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class ListItem extends PureComponent {
  onPress = () => {
    this.props.onItemPress({
      name: this.props.name,
      mobileNumber: this.props.mobileNumber,
    });
  }
  render() {
    const {
      name,
      mobileNumber,
    } = this.props;

    return (
      <View>
        <TouchableOpacity
          onPress={this.onPress}
        >
          <Text>{name}</Text>
          <Text>{mobileNumber}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  onItemPress: PropTypes.func.isRequired,
};

export default ListItem;
