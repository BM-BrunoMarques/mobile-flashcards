import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers'
import middleware from './middleware'
import Main from "./components/Main";
import { darkPurple } from "./utils/colors";
import Constants from "expo-constants";
import {
  setLocalNotification,
  getDailyReminderValue,
  clearLocalNotification
} from "./utils/helpers";


const store = createStore(reducer, middleware)

function BMStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }


  render() {
    return (
      <Provider store={store}>
        <BMStatusBar backgroundColor={darkPurple} barStyle="light-content" />
        <View style={styles.container}>
          <Main />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});