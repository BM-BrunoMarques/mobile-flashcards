import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <TouchableOpacity>
            <Text>Increase</Text>
          </TouchableOpacity>
          <Text>0</Text>
          <TouchableOpacity>
            <Text>Decrease</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </Provider>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
