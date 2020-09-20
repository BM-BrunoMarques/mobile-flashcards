import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome';
import { deleteDeck } from "../actions/index"
import { lightPurple, white, black, darkPurple, gray } from "../utils/colors";


class DeckDetails extends React.Component {

  state = {
    deckDeleted: false
  }

  goBack() {
    const { navigation, route } = this.props;
    navigation.goBack();
    route.params.deck({ deckTitle: 'deleteThisDeck0909012' });
  }

  handleSubmitDelete = (deckId) => {
    this.goBack()
  }

  render() {

    const { deckId, deckTitle, deckCards, cards } = this.props
    console.log('PROPSSS', this.props)
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.BackBtn} onPress={() => this.props.navigation.goBack()}>
          <FontAwesome name="arrow-left" size={30} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.pageTitle}>{deckTitle} </Text>
            <Text style={{ textAlign: 'center' }}>{deckCards.length} Cards</Text>

          </View>
          <View style={{ flex: 3 }}>
            {deckCards.length === 0
              ? <View style={{ paddingLeft: 5, marginBottom: 65 }}>
                <Text>Looks like there are no Cards available</Text>
                <Text>Why don't you add some :)</Text>
              </View>
              : null
            }
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                disabled={!deckCards.length > 0}
                onPress={() => this.props.navigation.navigate('quiz', { deckId: deckId })}
                style={ !deckCards.length > 0
                  ? [styles.NavBtn, styles.NavDisabled ]
                : styles.NavBtn }
              >
                <Text style={{ textAlign: "center", color: white }}>Start Quiz</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('addcard', { deckId: deckId })}
                style={styles.NavBtn}
              >
                <Text style={{ textAlign: "center", color: white }}>Add Cards</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => this.goBack()}
                style={styles.DelBtn}><Text style={{ color: '#FF0000', textAlign: "center" }}>Delete Deck</Text></TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Deck: {
    textAlign: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    padding: 20,
    width: 200,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000'
  },
  pageTitle: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 26,
    fontWeight: 'bold'
  },
  BackBtn: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  NavBtn: {
    width: 200,
    padding: 20,
    borderWidth: 1,
    borderColor: black,
    backgroundColor: darkPurple,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: black,
    marginBottom: 15
  },
  NavDisabled:{
    backgroundColor: lightPurple,
  }
})

function mapStateToProps(state, props) {

  const { deck } = props.route.params
  const { cards } = state.allDecks[deck.deckId]


  if (deck && cards) {
    return {
      deck: deck,
      deckTitle: deck.deckTitle,
      deckCards: cards,
      deckId: deck.deckId,
      decksLoaded: true
    }
  } else {
    return {
      decksLoaded: false
    }
  }
}

const mapDispatchToProps = dispatch => ({
  deleteThisDeck: (deck) => dispatch(deleteDeck(deck))
})


export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)