# Mobile Flash Cards - Native App
### ( Final exam from Udacity's React Native course )


### <div style="text-align: right; font-weight: bold">  Author: Bruno Marques </div>

Mobile Flash cards is an APP that allows you to create flashcards on your mobile device, you can create multiple Deck collections and inside those decks you will have two options, one to create cards and another to take a Quiz.
<br />
You should think of cards as "Questions", they should be created in a "Correct" or "Incorrect" format, which will allow you to choose your answer accordingly in the Quiz.
<br />

## Insights 
This project was built with React Native and Redux, even tho Redux was not a requirement. It started out from scratch, functions were built to get and set data accordingly, aswell as set data thru Async-Storage on your local mobile phone, which will allow you to retrieve your data even when you close the application.
<br />

This APP is using REDUX & Async-Storage, the initial data is loaded from Async-storage and set as REDUX state, which allows components to get information from the STORE, also everytime actions envoked, you can verify that there are api calls that hold the Async logic as well as the Reducers to modify the state, providing those sweet refrehes, without mutating the state.


Please consult the **rubric** for specifics. (https://review.udacity.com/#!/rubrics/1021/view)
  
# Getting Started  
Suggestion:
#### - clone this repository to your local machine.
#### - install all project dependencies with `npm install`
#### - start the development server with `npm start` or `expo start`
<br />

# Breakthrough

### This app was cross tested, and is working on `Android` and `Ios`.
#### This app will request `Permissions` to set notifications!
<br />

## Decks
###  - Navigation through URL 
Currently there is no way to delete created Decks, which is a feature I am working to implement in the future.

## Preview
*This is a preview of how the App works*<Br/>
![Gif animation LogIn](./readmeImg/mobileApp.gif)