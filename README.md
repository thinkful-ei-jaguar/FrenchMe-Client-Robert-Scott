## French Moi App
A Spaced Repetition App by Robert Perez & Scott Lingner

### Live Link: 
[https://frenchmoi.now.sh/](https://frenchmoi.now.sh/)

### Server Repo: 
[https://github.com/thinkful-ei-jaguar/FrenchMe-Server-Robert-Scott](https://github.com/thinkful-ei-jaguar/FrenchMe-Server-Robert-Scott)

### Tech Stack for French Moi
Front-end: React.js, CSS, media queries
Server: PostgreSQL
Hosting/SaaS: Heroku 
Development Environment: Zeit Now
Testing: Cypress, Mocha, Chai

### Summary
French Moi is an app that uses spaced repetition to help users memorize French words.

The user will have the option to log in or sign up, and then will be directed to a dashboard displaying their total correct answer, a list of French words to memorize, as well as the number of times they got each word wrong or right. 
<br />

![Dashboard](README-asset/dashboard.png?raw=true)

The app displays a word in French and then asks the user to recall the corresponding word in English.
<br />

![LearnPageFirstView](README-asset/learnpage1.png?raw=true)

<br />


If the user answers incorrectly, that word will be asked again sooner. 

<br />
![LearnPageIncorrectAnswerView](README-asset/learnpageincorrect.png?raw=true)

If the answer is correct, the user will be asked later on.

<br />
![LearnPageCorrectAnswerView](README-asset/learnpagecorrect.png?raw=true)


The user will be able to see their total count of correct guesses as well as the number of times they got each word wrong or right.





<br />


<br />
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.
