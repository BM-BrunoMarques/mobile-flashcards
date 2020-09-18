import { ADD_DECK, INITIAL_DATA } from '../actions'


function cards(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck.deckId]: action.deck
      }
      case INITIAL_DATA:
        return {
          ...state,
            ...action
        }
    default:
      return state
  }
}

export default cards 

