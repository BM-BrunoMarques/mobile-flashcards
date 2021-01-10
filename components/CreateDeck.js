import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getRandomIntNum } from "../utils/helpers";
import { connect } from "react-redux";
import { addDeck, handleInitialData } from "../actions/index";
import { black, darkPurple, lightPurple, white, gray } from "../utils/colors";
import FontAwesome from "../node_modules/@expo/vector-icons/FontAwesome";

// import * as api from '../utils/api' *FOR DEBUG - to clean  all decks in memory

function SubmitBtn({ onPress, disab }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disab}
      style={
        disab === true
          ? [styles.submitBtn, styles.submitBtnDisabled]
          : styles.submitBtn
      }
    >
      <Text
        style={
          disab === true
            ? [styles.submitTxt, styles.submitTxtDisabled]
            : styles.submitTxt
        }
      >
        Submit
      </Text>
    </TouchableOpacity>
  );
}

class CreateDeck extends React.Component {
  state = {
    deck: {
      deckId: "",
      deckTitle: "",
      cards: [],
    },
  };

  inputChange = (value) => {
    this.setState((state) => ({
      ...state,
      deck: {
        ...state.deck,
        deckTitle: value,
      },
    }));
  };

  handleSubmit = () => {
    const deckId = this.state.deck.deckTitle + getRandomIntNum();

    this.setState(
      (state) => ({
        deck: {
          ...state.deck,
          deckId,
        },
      }),
      () => {
        const newDeck = { ...this.state.deck };
        this.props.addNewDeck(newDeck);
        this.props.navigation.goBack();
      }
    );
  };

  // clear = () => {
  //   api.clearAll();
  // };
  //*FOR DEBUG - to clean  all decks in memory

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="heigth">
        <TouchableOpacity
          style={styles.BackBtn}
          onPress={() => this.props.navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={30} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            Add Deck
          </Text>
          <View>
            <TextInput
              placeholder="insert title"
              value={this.state.deck.deckTitle}
              onChangeText={(value) => this.inputChange(value)}
              style={styles.TextInput}
            />
            <SubmitBtn
              onPress={() => this.handleSubmit()}
              disab={this.state.deck.deckTitle === "" ? true : false}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TextInput: {
    height: 50,
    width: 290,
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ededed",
    alignSelf: "center",
  },
  submitBtn: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: black,
    backgroundColor: darkPurple,
    borderRadius: 5,
    width: 92,
    alignSelf: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: black,
  },
  submitBtnDisabled: {
    backgroundColor: lightPurple,
  },

  submitTxt: {
    color: white,
  },
  submitTxtDisabled: {
    color: gray,
  },

  BackBtn: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#FFF",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
});

const mapDispatchToProps = (dispatch) => ({
  addNewDeck: (deck) => dispatch(addDeck(deck)),
  initialData: () => dispatch(handleInitialData()),
});

export default connect(null, mapDispatchToProps)(CreateDeck);
