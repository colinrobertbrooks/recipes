# Recipes

Things on the internet that we eat.

## Bring Your Own Recipes

You can load your own recipes from a [Google Sheet](https://www.google.com/sheets):

1. Start a new spreadsheet, then add `type`, `name`, `link` and `notes` column headings to a sheet named "Recipes" (column order doesn't matter, but heading spelling and casing does).

2. [Publish to the web](https://support.google.com/docs/answer/183965).

3. Get the `SPREADSHEET_ID` from the url: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`.

4. [Generate a Google Cloud Platform API Key](https://cloud.google.com/docs/authentication?_ga=2.251668745.-1804148925.1629488635) (`KEY`).

5. Voila: `https://colinrobertbrooks.github.io/recipes?spreadsheetId=SPREADSHEET_ID&key=KEY`.

## Scripts

### Setup

`$ npm install`

### Develop

`$ npm start`

### Test

`$ npm run validate`

### Build

`$ npm run build`

### Deploy

`$ npm run deploy`

### Boilerplate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [TypeScript](https://create-react-app.dev/docs/adding-typescript/).
