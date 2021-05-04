# Evaluate News using natural language processing
This project is built with JavaScript. It uses JavaScript's async functionalities to get data from an API
## Running the app

- `npm run build-prod` will create the dist folder with the production files
- `npm run start` will start the node server (server.js) on localhost:8081
- `npm run build-dev`will run the developer build on localhost:8080

note: I put my api key because .env file wasn't read by javascript
## Functionality

enter a link in the field and the app will analyze the sentiment of the text. It will return for instance whether the entered text is positive or negative or objective or subjective.