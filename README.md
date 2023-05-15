# IPROG-Project-Group-34

## Description of project

Karaokify is a web application based on the Spotify Web API. The app will consist of a dashboard (much like the Spotify app), called the home view, where a user can search for songs, open their playlists and play and access lyrics for a song.

## What we have done so far

In the app, the user is able to do the following:

- Login to the app with spotify authentication. No need to sign up and create an account
- Search after songs for playback. Lyrics is displayed automatically
- The user can access their spotify playlists in the app. The content is also accessible in the app for playback
- Toggle between home-view and lyrics
- Access the playback history and directly play them from the home-view
- Do API-calls to spotify for the whole functionality of the app
- Store currentPlayingTrack and playback history in firebase realtime database

## Setup

Currently, in order to use the app, you will have to send us your email adress for your Spotify account. Additionally, you must have a spotify account inorder to login. We also would like to remind anyone wishing to use the app that they must have a premium spoitfy account as some of the components unfortunately require that.


## Project file structure

**src/assets** and **src/img**: All images used


**src/components**: All custom components we created


**src/presenters**: Presenters for views


**src/styles**: All css files.


**src/utils**: Api and authorization functions


**src/views**: All views used in the project. 


**src/store**: The redux store


**src/slices**: All the slices for store


**src/persistance**: FirebaseConfig & function that updates firebase realtime database

