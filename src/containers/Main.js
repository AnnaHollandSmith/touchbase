import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import checksInitialized from '../hocs/checksInitialized';

const mapStateToProps = state => ({
  initialized: state.user.initialized,
});

const Main = () => <Text>Initialized</Text>;

const MainContainer = connect(mapStateToProps)(checksInitialized(Main));

export default MainContainer;
