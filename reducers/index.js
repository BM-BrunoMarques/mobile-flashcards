import { ADD_DECK, ADD_CARD, INITIAL_DATA } from '../actions'

const initialState = {
  allDecks: {}
}

function cards(state = initialState, action) {
  console.log('ACTIONBM', action)
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        allDecks: {
          ...state.allDecks,
          [action.deck.deckId]: action.deck
        }
      }

    case ADD_CARD:
      return {
        ...state,
        allDecks: {
          ...state.allDecks,
          [action.deckId]:{
            ...state.allDecks[action.deckId],
            cards: state.allDecks[action.deckId].cards.concat(action.card)
          }

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

