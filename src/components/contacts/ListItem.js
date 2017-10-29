import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../styles/ListItem';

const {
  textStyle,
  textSelectedStyle,
  containerStyle,
  containerSelectedStyle,
} = styles;

class ListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.inSelected,
    }
  }
  onPress = () => {
    this.setState({
      selected: !this.state.selected,
    })
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

    const { selected } = this.state
    return (
      <View
        style={[
          containerStyle,
          selected && containerSelectedStyle,
        ]}
      >
        <TouchableOpacity
          onPress={this.onPress}
        >
          <Text
            style={[
              textStyle,
              selected && textSelectedStyle,
            ]}
          >
            {name}
          </Text>
          <Text
            style={[
              textStyle,
              selected && textSelectedStyle,
            ]}
          >
            {mobileNumber}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  onItemPress: PropTypes.func.isRequired,
  inSelected: PropTypes.bool.isRequired,
};

export default ListItem;
