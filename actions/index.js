import * as api from '../utils/api';

export const ADD_DECK = "ADD_DECK";
export const INITIAL_DATA = "INITIAL_DATA";


export const addDeck = (deck) => dispatch => {
  api.addDeck(deck).then(() => {
  dispatch({
      type: ADD_DECK,
      deck
  })
}).catch(err => console.log(err))
}

export const handleInitialData = () => dispatch => {
  api.getInitialData().then(iniData => {
    dispatch({
      type: INITIAL_DATA,
      iniData
    })
  })
} 

export const addCard = (deckId,card) => dispatch => {
  api.addCard(deckId,card).then(() => {
    dispatch({
      type: ADD_CARD,
      deckId,
      card
    })
  }).catch(err => console.log(err))
}