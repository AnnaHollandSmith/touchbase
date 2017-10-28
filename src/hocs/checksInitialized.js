import React from 'react';
import PropTypes from 'prop-types';
import Signup from '../containers/Signup';

const isInitialized = (ComposedComponent) => {
  const ComponentWrapper = ({ initialized, ...passThroughProps }) => (
    initialized ?
      <ComposedComponent {...passThroughProps} /> :
      <Signup />
  );

  ComponentWrapper.propTypes = {
    initialized: PropTypes.bool.isRequired,
  };

  return ComponentWrapper;
};

export default isInitialized;
