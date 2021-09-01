# Travel App Author by Samiha Amroune

This project is a summary of what we took during this course presented [Udacity](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011) Become a Front End Web Developer Nanodegree program.

A travel application is a project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week; we are going to use the Weatherbit API. [Weatherbit API](https://www.weatherbit.io/account/create) has one problem, it only takes in coordinates for weather data -- it’s that specific. So, we’ll need to get those coordinates from the [Geonames API](http://www.geonames.org/export/web-services.html). Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the [Pixabay API](https://pixabay.com/api/docs/).

## Build Tools using:

* HTML
* CSS
* JavaScript
* Node
* Express
* Webpack
* Geonames 
* Weatherbit
* Pixabay
* Jest
* Workbox

## Installation

Make sure [Node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) are installed from the terminal.
```
node -v
npm -v
```

1. Move to the project folder
```
cd <project directory>
```
2. Install npm
```
npm install
```
3. Sign up for an API key
 * [Weatherbit API](https://www.weatherbit.io/account/create)
 * [Geonames API](http://www.geonames.org/export/web-services.html)
 * [Pixabay API](https://pixabay.com/api/docs/)

4. replace your APIs in the file app.js
	```
	** ../src/client/js/app **
	```
5. Start the project

### To Run Project

**prod mode allows you to see the results of the API fetch**:
- cd into your new folder and run in prod mode 
- `npm install`
- `npm run build-prod to generate a dist folder for prod`
- `npm run start to run the Express server on port 8081`

6. Open browser at http://localhost:8081/

7. To start mode developement run:
```
npm run build-dev
```