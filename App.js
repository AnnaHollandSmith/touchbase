/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font } from 'expo';
import reducers from './src/reducers';
import Root from './src/containers';

const store = createStore(reducers);

const logo = require('./assets/images/touchbase.png');
const ralewayRegular = require('./assets/Raleway/Raleway-Regular.ttf');

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
        <Root />
      </Provider>
    );
  }
}

export default App;
