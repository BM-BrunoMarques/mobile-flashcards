import { AsyncStorage } from 'react-native'
import { FLASH_STORAGE_KEY } from './helpers'


export function addDeck(deck) {
  let deckObject = deck
  return AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify(
    { [deck.deckId]: deck }
  )).then(() => deckObject).catch(err => console.log(err))
}

export function addCard(deckId, card) {
  return AsyncStorage.getItem(FLASH_STORAGE_KEY)
    .then((stringDecks => {
      let parseDecks = JSON.parse(stringifiedDecks)
      let deckKeys = Object.keys(parseDecks)

      deckKeys[key].questions.push(card)
      console.log(deckKeys)

    }))
}


export function clearAll() {
  return AsyncStorage.clear()
}

export function getInitialData() {
  return AsyncStorage.getItem(FLASH_STORAGE_KEY)
    .then(stringData => {
      return JSON.parse(stringData)
    })
} 