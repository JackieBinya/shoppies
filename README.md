# The Shoppies

The project is part of my application for Shopify UX & Web Developer Intern Challenge Summer 2021.
Its based of a challenge found in this [url](https://docs.google.com/document/d/1TiqUKKtW8BpM3Fand6enxlsJ__JeUI5fKKAGNB1hfCc/edit?usp=sharing).

## The Tech Stack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To run the project in your local dev enviroment

- Clone this repository
- Register with [OMDB's API](http://www.omdbapi.com) to get an API KEY
- Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).
- In the root of the project directory create a `.env` file
- Follow the example in `.env.sample` to create the required environmental variables in `.env`
- In your the command `yarn install` to install of the required package dependencies.
- To start your developmental server use the command `yarn start`.

## The extra features I added the project
- I added input validation, an input of white space or invalid data (e.g. input of a letter or number) will trigger an error message.
- Error in the server will also be shown in an error message.
- I also added a loader for retrieving search result from the API.

  _Happy Coding🌻_
