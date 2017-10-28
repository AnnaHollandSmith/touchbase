import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import Root from './src/containers';

const store = createStore(reducers);

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
