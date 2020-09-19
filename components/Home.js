import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// IF I ACCESS THIS.PROPS
class Home extends React.Component {
  render() {
    const Decks = this.props.allDecks
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Your Decks</Text>
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.ScrollView}>
          {Decks
            ? Object.keys(Decks).map((K) => {
              return <View key={Decks[K].deckId}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('deckDetails', { deck: Decks[K] })}
                  style={styles.Deck}>
                  <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
                    {Decks[K].deckTitle}
                  </Text>
                  <Text style={{ textAlign: "center" }}>
                    {Decks[K].cards.length} Cards.
                  </Text>
                </TouchableOpacity>
              </View>
            })
            : null
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Deck: {
    paddingBottom: 40,
    paddingTop: 40,
    width: 300,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#000'
  },
  pageTitle: {
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 25,
    fontSize: 26,
    fontWeight: 'bold'
  }
})

function mapStateToProps({ allDecks }) {
  return {
    allDecks: allDecks
  }
}

export default connect(mapStateToProps)(Home)