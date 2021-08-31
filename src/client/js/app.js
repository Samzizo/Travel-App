
// Global Variables
const geoNameId = "sam_2021";
const weatherApi = "84af56643f3f4f12bf081f9a1597fd25";
const pixabayApi = "22840329-8fadc9e4ee6c098a494c3683b";

// get user input
let city = document.getElementById('city').value;
let dateDepart = document.getElementById('depart').value;
console.log(dateDepart);
let dateReturn = document.getElementById('return').value;

// base URL
const baseUrl = 'http://localhost:8081/trapp';
const geoNamesURL = "http://api.geonames.org/searchJSON?name=" + city + "&maxRows=1&username=" + geoNameId;
const pixaURL = "https://pixabay.com/api/?key=" + pixabayApi + "&q=" + city + "&image_type=photo";
const weatherUrl = "http://api.weatherbit.io/v2.0/forecast/daily?key=" + weatherApi + "&lat=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//CHAIN: post & get


// Event listener to add function to existing HTML DOM element
document.getElementById('btn').addEventListener('click', postRetrieve);

function postRetrieve(e) {
    e.preventDefault()
    retrieveGeoData(geoNamesURL) //get data from api
	.then(function (geoNameRes) {
        postData(baseUrl, {
            //bundle user data and api, and store
			'latitude': geoNameRes[0],
            'longitude': geoNameRes[1],
            'country': geoNameRes[2],
        })
        retrieveWeatherData(weatherUrl + geoNameRes[0] + "&lon=" + geoNameRes[1]+"&start_date="+dateDepart+"&end_date="+dateReturn) //get data from api
        .then(function (weatherbitRes){
            postData(baseUrl, {
                //bundle user data and api, and store
                'Maximum temp': weatherbitRes[0],
                'Minimum temp': weatherbitRes[1],
                'Description': weatherbitRes[2],
            })
            document.getElementById('place').innerHTML= "Place destination: " + city;
            document.getElementById('departure').innerHTML= "Date departure: " + dateDepart;
            updateUI(weatherbitRes);
        })
    });
    retrievePixaData(pixaURL)
    .then(function (imgURL) {
        postData(baseUrl, {
            'Image': imgURL
        })
        updateImg(imgURL);
    }).catch((error) => {
        // appropriately handle the error
        console.log('error', error);
    })
}

// ASYNC get from APIs

// Get GeoNames data
const retrieveGeoData = async (geoNamesURL) =>{ 
    const res = await fetch(geoNamesURL);
    try {
    // Transform into JSON
    let geoData = await res.json();
    console.log(geoData.geonames);
    const lat = geoData.geonames[0].lat;
    console.log('lat:'+lat);
    const lng = geoData.geonames[0].lng;
    console.log('lng:'+lng);
    const country = geoData.geonames[0].countryName;
    console.log('country:'+country);
    const geoNameRes = [lat, lng, country];
    console.log('geoNameRes:'+geoNameRes);
    return geoNameRes;
    } catch (error) {
        console.log('error:', error);
      // appropriately handle the error
    }
};

// Get Weatherbit data
const retrieveWeatherData = async (weathUrl) =>{
    const res = await fetch(weathUrl);
    try {
        let weatherdata = await res.json();
        console.log(weatherdata);
        const maxTemp = weatherdata.data[0].max_temp;
        console.log('max temp:'+maxTemp);
        const minTemp = weatherdata.data[0].low_temp;
        console.log('min temp:'+minTemp);
        const desc = weatherdata.data[0].weather.description;
        console.log('description:'+desc);
        const weatherbitRes = [maxTemp, minTemp, desc];
        return weatherbitRes;
    } catch (error) {
        console.log('error:', error);
      // appropriately handle the error
    }
}

// Get Pixabay data

const retrievePixaData = async (pixaURL) => {
    const res = await fetch(pixaURL);
    try {
        let pixaPic = await res.json();
        const imgURL = pixaPic.hits[0].webformatURL;
        return imgURL;
    }catch(error) {
        console.log('error:', error);
      // appropriately handle the error
    }
}

// ASYNC get from Local

const updateUI = async (weatherbitRes) => {
    const request = await fetch(baseUrl);
    try {
        const weatherbitRes = await request.json();
        document.getElementById('max_temp').innerHTML = weatherbitRes[0];
        document.getElementById('min_temp').innerHTML = weatherbitRes[1];
        document.getElementById('weatherInfo').innerHTML = weatherbitRes[2];
    } catch (error) {
        console.log('error:', error);
      // appropriately handle the error
    }
};

const updateImg = async (imageurl) => {
    const request = await fetch(baseUrl);
    try {
        document.getElementById('pixaimg').setAttribute('src', imageurl); 
    } catch (error) {
        console.log('error:', error);
      // appropriately handle the error
    }
}

// Async POST

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
}

export { postRetrieve }
