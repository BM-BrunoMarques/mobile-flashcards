import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateDeck from "./CreateDeck";
import { connect } from 'react-redux';
import { handleInitialData } from "../actions/index";
import Navigation from '../navigation/Navigation';

class Main extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    
    this.props.initialData()

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 350)


  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading === true
          ? null
          : <Navigation />
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


const mapDispatchToProps = dispatch => ({
  initialData: () => dispatch(handleInitialData())
})

const mapStateToProps = state => ({
  loading: state.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)