import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome';

const showAnswer = 'showAnswer'
const Correct = 'Correct'
const Incorrect = 'Incorrect'
const GoBack = 'GoBack'
const mRestart = 'Restart'

function QuizzBtn({ onPress, Texto }) {
  { console.log(onPress) }
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>
        {Texto}
      </Text>
    </TouchableOpacity>
  )
}

class Quiz extends React.Component {
  state = {
    count: 0,
    totalCorrect: 0,
    showAnswer: false,
  }

  handleAnswer = (answer) => {
    console.log('ANS', answer)

    switch (answer) {
      case mRestart:
        return this.setState({ count: 0, totalCorrect: 0 })
        break;
      case showAnswer:
        return this.setState({ showAnswer: true })
        break;
      default:
        const { deckCards } = this.props
        const { count } = this.state
        const savedAnswer = deckCards[count].answer
        const userAnswer = (savedAnswer === answer)
        return this.handleQState(userAnswer)
    }
  }

  handleQState = (userAnswer) => (
    this.setState({
      count: this.state.count + 1,
      totalCorrect: userAnswer
        ? this.state.totalCorrect + 1
        : this.state.totalCorrect,
      showAnswer: false
    })
  )

  //Quiz Render
  quizRender = () => {
    const { deckCards } = this.props
    const { count } = this.state
    return (
      <View>
        <Text>{deckCards[count].question}</Text>
        <Text>
          {this.state.showAnswer
            ? deckCards[count].answer ? Correct : Incorrect
            : ' '}
        </Text>
        <QuizzBtn Texto={showAnswer} onPress={() => this.handleAnswer(showAnswer)} />
        <QuizzBtn Texto={Correct} onPress={() => this.handleAnswer(true)} />
        <QuizzBtn Texto={Incorrect} onPress={() => this.handleAnswer(false)} />
      </View>
    )
  }
  //Results Render
  resultsRender = () => {
    const { count, totalCorrect } = this.state
    return (
      <View>
        <Text>The End!</Text>
        <Text>Results: {totalCorrect} / {count}</Text>
        <QuizzBtn Texto={GoBack} onPress={() => this.props.navigation.goBack()} />
        <QuizzBtn Texto={mRestart} onPress={() => this.handleAnswer(mRestart)} />
      </View>
    )
  }

  render() {
    const { deckId, deckTitle, deckCards, deck } = this.props
    const { QuizProcessing, quizNum } = this.state
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.BackBtn} onPress={() => this.props.navigation.goBack()}>
          <FontAwesome name="arrow-left" size={30} />
        </TouchableOpacity>
        <View>
          {
            this.state.count < deckCards.length
              ? this.quizRender()
              : this.resultsRender()
          }
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
    padding: 20,
    width: 200,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000'
  },
  DelBtn: {
    padding: 5,
    fontWeight: '800',
    marginTop: 15,
    textDecorationLine: "underline",
    textDecorationColor: '#FF0000'
  }
})

function mapStateToProps(state, props) {

  const { deckId } = props.route.params
  const deck = state.allDecks[deckId]

  return {
    deck: deck,
    deckTitle: deck.deckTitle,
    deckCards: deck.cards,
    deckId: deckId,
  }
}


export default connect(mapStateToProps)(Quiz)