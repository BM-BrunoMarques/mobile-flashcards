import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Switch, View, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addCard } from "../actions/index";
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome';
import { black, darkPurple, gray, lightPurple, white } from "../utils/colors";
import { SafeAreaView } from 'react-native-safe-area-context';

function SubmitBtn({ onPress, disab }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disab}
      style={disab === true
        ? [styles.submitBtn, styles.submitBtnDisabled]
        : styles.submitBtn}>
      <Text
        style={disab === true
          ? [styles.submitTxt, styles.submitTxtDisabled]
          : styles.submitTxt}
      >
        Submit
      </Text>
    </TouchableOpacity>
  )
}

class CreateaCard extends React.Component {
  state = {
    question: '',
    answer: true,
    deckId: ''
  }

  componentDidMount() {
    this.setState({
      deckId: this.props.deckId
    })
  }

  inputChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {

    const { question, answer, deckId } = this.state
    const newCard = { question, answer }

    this.props.addNewCard(deckId, newCard)
    this.cleanCardState()
  }

  cleanCardState = () => {
    setTimeout(() => {
      this.setState({
        question: '',
        answer: true,
      })
    }, 200)
  }

  render() {
    const { question, answer } = this.state
    let disabled = [question, answer].includes('')

    const isEnabled = this.state.answer


    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.BackBtn} onPress={() => this.props.navigation.goBack()}>
          <FontAwesome name="arrow-left" size={30} />
        </TouchableOpacity>

        <Text style={{ fontSize: 30, marginBottom: 30, marginTop: 45, textAlign: 'center' }}>
          Card Question:
        </Text>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-start", marginTop: 35, }}>
            <TextInput
              placeholder='Question:'
              value={this.state.question}
              onChangeText={(value) => this.inputChange(value, 'question')}
              style={styles.TextInput}
            />
            <View style={{ flexDirection: 'row', marginTop: 15, width: 290, justifyContent: 'space-between', flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ height: 29, borderWidth: 1, fontSize: 11, fontWeight: 'bold', padding: 8, borderColor: '#FF0000', color: '#FF0000', borderRadius: 3, marginTop: 7, marginRight: 4 }}>FALSE</Text>
                <Switch
                  trackColor={{ true: '#a3d3cf', false: '#FF0000' }}
                  thumbColor={[Platform.OS == 'ios' ? '#009688' : (isEnabled ? '#009688' : '#FF0000')]}
                  ios_backgroundColor="#fbfbfb"
                  onValueChange={(value) => this.inputChange(value, 'answer')}
                  value={this.state.answer}
                  style={{ margin: 6}}
                />

                <Text style={{ height: 29, borderWidth: 1, fontSize: 11, fontWeight: 'bold', padding: 8, borderColor: '#009688', color: '#009688', borderRadius: 3, marginTop: 7, marginLeft: 4 }}>TRUE</Text>
              </View>

              <SubmitBtn onPress={() => this.handleSubmit()} disab={disabled} />
            </View>
          </View>
        </SafeAreaView>
      </View>
    )
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
    backgroundColor: '#ededed',
  },
  submitBtn: {
    padding: 10,
    marginTop: 65,
    borderWidth: 1,
    borderColor: black,
    backgroundColor: darkPurple,
    borderRadius: 5,
    width: 92,
    alignSelf: 'flex-start',
    textAlign: "center",
    borderWidth: 1,
    borderColor: black
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
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
})


function mapStateToProps(state, props) {
  const { deckId } = props.route.params

  return {
    deckId: deckId,
  }

}

const mapDispatchToProps = dispatch => ({
  addNewCard: (deckId, newCard) => dispatch(addCard(deckId, newCard)),
  initialData: () => dispatch(handleInitialData())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateaCard)