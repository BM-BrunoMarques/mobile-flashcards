import { ADD_DECK } from '../actions'


function cards(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck.deckId]: action.deck
      }
    default:
      return state
  }
}

export default cards 