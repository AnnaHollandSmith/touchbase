/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { AppLoading, Asset, Font, SecureStore } from 'expo';
import reducers from './src/reducers';
import Main from './src/containers/Main';
import { checkUserInitialized } from './src/actions/user';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
store.dispatch(checkUserInitialized());

const logo = require('./assets/images/touchbase.png');
const ralewayRegular = require('./assets/Raleway/Raleway-Regular.ttf');
const ralewayBold = require('./assets/Raleway/Raleway-Bold.ttf');
const pacificoRegular = require('./assets/Pacifico/Pacifico-Regular.ttf');

// SecureStore.deleteItemAsync('user');

class App extends Component {
  constructor() {
    super();

    this.state = {
      imagesReady: false,
      fontReady: false,
    };

    this.cacheResourcesAsync = this.cacheResourcesAsync.bind(this);
  }

  async componentWillMount() {
    await Font.loadAsync({
      'raleway-regular': ralewayRegular,
      'raleway-bold': ralewayBold,
      'pacifico-regular': pacificoRegular,
    });
    this.setState({
      fontReady: true,
    });
  }

  async cacheResourcesAsync() {
    const images = [
      logo,
    ];
    const cacheImages = images.map(img => (
      Asset.fromModule(img).downloadAsync()
    ));
    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.fontReady || !this.state.imagesReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => this.setState({ imagesReady: true })}
        />
      );
    }
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
