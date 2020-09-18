import { AsyncStorage } from 'react-native'
import { FLASH_STORAGE_KEY } from './helpers'


export function addDeck (deck) {
  const deckObject = deck
  return AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify(
    {[deck.deckId]:deck}
  )).then(() => deckObject).catch(err => console.log(err))
}

export function addCard (deckId,Card) {
  return AsyncStorage.getItem(FLASH_STORAGE_KEY)
  .then((stringed) => deckObject).catch(err => console.log(err))
}


export function getAllKeys () {
  return AsyncStorage.clear()
}