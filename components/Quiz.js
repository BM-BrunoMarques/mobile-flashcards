import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome';
import { red, lightRed, lightGreen, gray, darkGray } from "../utils/colors";

// here you can change the default texts for Quiz page 
const showAnswer = 'Show Answer'
const hideAnswer = 'Hide Answer'
const Correct = 'Correct'
const Incorrect = 'Incorrect'
const GoBack = 'Go Back'
const mRestart = 'Restart'

function QuizzBtn({ onPress, Texto, styl }) {

  console.log('ST : ', styl)
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text style={styl}>
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
      case hideAnswer:
        return this.setState({ showAnswer: false })
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

  showCorrectAnswer = () => (<Text style={[styles.answerSpoiled, { color: lightGreen }]}>{Correct}</Text>)
  showIncorrectAnswer = () => (<Text style={[styles.answerSpoiled, { color: lightRed }]}>{Incorrect}</Text>)


  //Quiz Render
  quizRender = () => {
    const { deckCards } = this.props
    const { count } = this.state

    return (
      <View>
          <Text style={{ textAlign: 'center', fontSize: 18, color: darkGray, marginTop: 39 }}>({count + 1} / {deckCards.length})</Text>
          <Text style={styles.Question}>{deckCards[count].question}</Text>
        {this.state.showAnswer
          ? deckCards[count].answer ? this.showCorrectAnswer() : this.showIncorrectAnswer()
          : null}

        {this.state.showAnswer
          ? <QuizzBtn Texto={hideAnswer} styl={styles.hideAnswer} onPress={() => this.handleAnswer(hideAnswer)} />
          : <QuizzBtn Texto={showAnswer} styl={styles.showAnswer} onPress={() => this.handleAnswer(showAnswer)} />
        }
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <QuizzBtn Texto={Correct} styl={styles.Correct} onPress={() => this.handleAnswer(true)} />
          <QuizzBtn Texto={Incorrect} styl={styles.Incorrect} onPress={() => this.handleAnswer(false)} />
        </View>
      </View>
    )
  }
  //Results Render
  resultsRender = () => {
    const { count, totalCorrect } = this.state
    return (
      <View>
        <Text style={[styles.Question, {marginTop:65}]}>The End!</Text>
        <View style={{ borderWidth: 1, borderColor: darkGray, padding: 8, borderRadius: 2, borderStyle: "dashed", marginTop: 10 }}>
          <Text styles={{ fontSize: 19 }}>You answered correctly: </Text>
          <Text style={{ textAlign: "center", fontSize: 19 }}> <Text style={styles.ResultNum}>{totalCorrect}</Text> out of <Text style={styles.ResultNum}>{count}</Text></Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <QuizzBtn Texto={mRestart} styl={styles.mRestart} onPress={() => this.handleAnswer(mRestart)} />
          <QuizzBtn Texto={GoBack} styl={styles.GoBack} onPress={() => this.props.navigation.goBack()} />
        </View>
      </View>
    )
  }

  // React Component Class Quiz Render here:
  render() {
    const { deckId, deckTitle, deckCards, deck } = this.props
    const { QuizProcessing, quizNum } = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>

          <TouchableOpacity style={styles.BackBtn} onPress={() => this.props.navigation.goBack()}>
            <FontAwesome name="arrow-left" size={30} />
          </TouchableOpacity>

          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            {
              this.state.count < deckCards.length
                ? this.quizRender()
                : this.resultsRender()
            }
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BackBtn: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  Question: {
    textAlign: 'center',
    marginTop: 6,
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 10,
  },
  /**Button styles**/
  showAnswer: {
    color: red,
    textDecorationLine: "underline",
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: "bold",
  },
  hideAnswer: {
    color: red,
    textDecorationLine: "line-through",
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  answerSpoiled: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 4
  },
  Correct: {
    color: lightGreen,
    fontSize: 30,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 35,
    paddingBottom: 35,
    paddingRight: 20,
    paddingLeft: 20,
    marginRight: 8,
  },
  Incorrect: {
    color: lightRed,
    fontSize: 30,
    borderWidth: 1,
    padding: 4,
    marginLeft: 2,
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 35,
    paddingBottom: 35,
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 8,
  },
  GoBack: {
    color: red,
    fontSize: 30,
    marginTop:30,
    borderWidth: 1,
    width: 130,
    textAlign:"center",
    borderRadius:4,
    padding: 3
  },
  mRestart: {
    color: red,
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: "underline",
  },
  ResultNum: {
    fontSize: 21,
    fontWeight: "bold",
  },
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