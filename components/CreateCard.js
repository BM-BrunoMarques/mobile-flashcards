import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addDeck } from "../actions/index";
import * as api from '../utils/api';

function SubmitBtn({ onPress, disab }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disab}
      style={disab === true
        ? [styles.submitBtn, styles.submitBtnDisabled]
        : styles.submitBtn}>
      <Text>ADD DECK</Text>
    </TouchableOpacity>
  )
}

class CreateDeck extends React.Component {
  state = {
    deck: {
      deckId: '',
      deckTitle: '',
      cards: []
    }
  }

  inputChange = (value) => {
    this.setState(state => ({
      ...state,
      deck: {
        ...state.deck,
        deckTitle: value
      }
    }))
  }

  handleSubmit = () => {
    const deckId = this.state.deck.deckTitle + getRandomIntNum()

    setTimeout(() => {
      this.setState(state => ({
        ...state,
        deck: {
          ...state.deck,
          deckId: deckId
        }
      }))
    }, 30)

    setTimeout(() => {
      const newDeck = {...this.state.deck}
      this.props.addNewDeck(newDeck)
    }, 50)




    this.cleanDeckState()
  }

  cleanDeckState = () => {
    setTimeout(() => {
      const cleanDeck = { ...this.state.deck }
      cleanDeck.deckTitle = ''
      cleanDeck.deckId = ''
      this.setState({
        deck: cleanDeck
      })
    }, 300)
  }

  //remove
  getKeys = () => {
    const keys = api.getAllKeys()
    console.log(keys)
  }


  render() {
    return (
      <SafeAreaView behavior='padding' style={styles.container}>
        <Text style={{ fontSize: 30 }}>
          Deck Title
        </Text>
        <TextInput value={this.state.deck.deckTitle} onChangeText={(value) => this.inputChange(value)} style={styles.TextInput} />
        <SubmitBtn onPress={() => this.handleSubmit()} disab={this.state.deck.deckTitle === '' ? true : false} />
        <SubmitBtn onPress={() => this.getKeys()} disab={this.state.deck.deckTitle === '' ? true : false} />
        <Text>{JSON.stringify(this.state)
        }</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    height: 50,
    width: 290,
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ededed',
  },
  submitBtn: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  submitBtnDisabled: {
    backgroundColor: '#ff0000',
  }
})


const mapDispatchToProps = dispatch => ({
  addNewDeck: (deck) => dispatch(addDeck(deck))
})

export default connect(null, mapDispatchToProps)(CreateDeck)