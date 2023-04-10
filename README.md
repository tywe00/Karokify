# IPROG-Project-Group-34

## Description of project

Karaokify is a web application based on the Spotify Web API. The app will consist of a dashboard (much like the Spotify app), called the home view, where a user can search for songs, open their playlists and play and access lyrics for a song.

## What we have done so far

We currently have two views, the login view and the home view. The login view enables users to gain access to an authorization token by loggin in with their Spotify account. By doing that, a user is able to access the home view, where their authorization token is used to make calls to the Spotify API.

##### Note: Currently, in order to use the app, you will have to send us your email adress for your Spotify account.

## What we plan to do

What is left to do is to implement the fundamental functionality of the app. So far we have taken care of authentication and basic api rendering. The things we are going to focus on doing now is being able to access your playlists, search for songs/albums, play songs and access lyrics for them. Lyrics can not be accessed through the Spotify Web API, so we will have to use some third party libraries for this.

## Project file structure

**src/assets** and **src/img**: All images used


**src/components**: All custom components we created


**src/presenters**: Presenters for views


**src/styles**: All css files.


**src/utils**: Api and authorization functions


**src/views**: All views used in the project



These will all be used later for **redux**.


**src/actions**:


**src/store**:


**src/reducers**:
