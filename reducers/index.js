import { ADD_DECK, INITIAL_DATA } from '../actions'

const initialState = {
  allDecks: {}
} 

function cards(state = initialState, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        allDecks: {
          ...state.allDecks,
          [action.deck.deckId]: action.deck 
        }
      }

    case INITIAL_DATA:
      return {
        ...state,
        ...action,
        'loading': false
      }
    default:
      return state
  }
}

export default cards

