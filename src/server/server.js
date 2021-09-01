// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mockAPIResponse = require('./mockAPI.js')

// Start up an instance of app
const app = express()

// Configure cors to avoid cors-origin issue
const cors = require('cors');
app.use(cors());

//Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('dist'))
console.log(__dirname)

let projectData = {}

// Get routes
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // TypeError: path must be absolute or specify root to res.sendFile
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/trapp', (req, res) => {
    res.send(projectData)
    console.log(projectData);
})
// POST Route

app.post('/trapp', function(req, res) {
    const data = req.body;
    projectData['latitude'] = data['latitude'];
    projectData['longitude'] = data['longitude'];
    projectData['country'] = data['country'];
    projectData['max_temp'] = data['max_temp'];
    projectData['min_temp'] = data['min_temp'];
    projectData['description'] = data['description'];
    projectData['image'] = data['image'];
        res.send(projectData)
        console.log('POST')
        console.log(projectData)
})

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, startupMessage);
function startupMessage () {
    console.log("Hi There I'm running :)");
    console.log(`running on localhost: ${port}`);
}

// export app to use it in the unit testing

module.exports = {
    app
}
