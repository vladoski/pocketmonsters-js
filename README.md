# PocketMonsters JS

Little game "cross platform" app made for the Mobile Computing (2019/2020) UniMI course that kinda mocks Augmented Reality games in a bad way.

The player has to fight three types of monsters around the Milan Metropolitan Area to gain experience points. Eating candies heals the player (adds life points to the player). To fight a monster or eat a candy the player has to be within a radius of 50m from the monster or candy. The app lets the player to change his nickname and profile picture. Also there's the player ranking with the top 20 players of the game.

This version is developed using Svelte.js and Cordova (instead of Android SDK in Java). I've used Mapbox GL JS for everything that concernes the map.

## Installation
Firstly you have to get Phonegap installed globally using:
```
npm install -g phonegap@latest
```
Then it's needed to install all the packages used in the project with
```
npm install
```
And last but not least, preparing Phonegap (i.e. plugin configuration)
```
phonegap prepare
```

## Running
To run the app in the browser execute this command:
```
npm run dev
```
To run the app in Android, do:
```
phonegap run android
```

#### Disclaimer
This app has been tested and developed only for Android and browser platforms (no iOS).

I do not host the API, so if the app won't reach the server that means that the professor took down the server.
