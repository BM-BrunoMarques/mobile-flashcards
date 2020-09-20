import { AsyncStorage } from 'react-native'
import { FLASH_STORAGE_KEY } from './helpers'


export function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

export function addDeck(deck) {
  let deckObject = deck
  return AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify(
    { [deck.deckId]: deck }
  )).then(() => deckObject).catch(err => console.log(err))
}


export function addCard(deckId, card) {
  const oDeckId = deckId
  const oCard = card
  return AsyncStorage.getItem(FLASH_STORAGE_KEY)
    .then((stringDecks => {
      let parseDecks = JSON.parse(stringDecks)

      let allDecks = parseDecks

      allDecks[oDeckId].cards.push(oCard)
      return AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify(allDecks))

    }))
}

export function deleteDeck(deck) {
  const oDeckId = deck
  return AsyncStorage.getItem(FLASH_STORAGE_KEY)
    .then((stringDecks => {
      let parseDecks = JSON.parse(stringDecks)
      let allDecks = parseDecks

      const DeckFiltered = _objectWithoutProperties(allDecks, [deck]);

      return (
        AsyncStorage.removeItem(FLASH_STORAGE_KEY).then(() => (
          AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify(DeckFiltered)))
        )
      )

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