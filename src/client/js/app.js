
// Global Variables
const geoNameId = "sam_2021";
console.log("my geo name Id: ", geoNameId);
const weatherApi = "84af56643f3f4f12bf081f9a1597fd25";
console.log("my weatherAPi: ", weatherApi);
const pixabayApi = "22840329-8fadc9e4ee6c098a494c3683b";
console.log("my piaxa pic API: ", pixabayApi);


//CHAIN: post & get
// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', () => {
    const button_submit = document.getElementById("btn");
    button_submit.addEventListener("click", postRetrieve);
});

function postRetrieve(e) {
    e.preventDefault()
    // get user input
    let city = document.getElementById('city').value;
    if (city.length == 0) {
        alert("Please enter valid city");
        return
    }
    console.log(city);
    let dateDepart = document.getElementById('depart').value;
    console.log(dateDepart);
    let dateReturn = document.getElementById('return').value;
    console.log(dateReturn);

    // base URL
    const geoNamesURL = "http://api.geonames.org/searchJSON?name=" + city + "&maxRows=1&username=" + geoNameId;
    const pixaURL = "https://pixabay.com/api/?key=" + pixabayApi + "&q=" + city + "&image_type=photo";
    const weatherUrl = "http://api.weatherbit.io/v2.0/forecast/daily?key=" + weatherApi + "&lat=";
    
     // Create a new date instance dynamically with JS
    let d = new Date();

    // countDown
    const timeDifference = Math.ceil(new Date(dateDepart).getTime() - d.getTime());
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    document.getElementById('departure').innerHTML = remainingDays + " day(s) until departure!";
    console.log(remainingDays);

    //calculate length of trip
    const difference = new Date(dateReturn).getTime() - new Date(dateDepart).getTime();
    const dayDifference = difference / (1000 * 3600 * 24);
    document.getElementById('returning').innerHTML = "Length of trip: " + dayDifference + " day(s)";
    console.log(dayDifference);

    retrieveGeoData(geoNamesURL) //get data from api
    .then(function (geoNameRes) {
        // instead of posting data, get weather data
        retrieveWeatherData(weatherUrl + geoNameRes[0] + "&lon=" + geoNameRes[1]+"&start_date="+dateDepart+"&end_date="+dateReturn) //get data from api
            .then(function (weatherbitRes) {
            // after getting weather data
            // you can post it along with Geonames
            postData('http://localhost:8081/trapp', {
                //bundle user data and api, and store
                latitude: geoNameRes[0],
                longitude: geoNameRes[1],
                country: geoNameRes[2],
                max_temp: weatherbitRes[0],
                min_temp: weatherbitRes[1],
                description: weatherbitRes[2],
            });
            document.getElementById("place").innerHTML =
                "Place destination: " + city;
            updateUI();
        });
    });
    retrievePixaData(pixaURL)
    .then(function (imgURL) {
        postData('http://localhost:8081/trapp', {
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
        const minTemp = weatherdata.data[0].min_temp;
        console.log('min temp:'+minTemp);
        const desc = weatherdata.data[0].weather.description;
        console.log('description:'+desc);
        const weatherbitRes = [maxTemp, minTemp, desc];
        console.log(weatherbitRes);
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

const updateUI = async () => {
    const request = await fetch('http://localhost:8081/trapp');
    try {
        const data = await request.json();
        console.log(data);
        document.getElementById('max_temp').innerHTML = data['max_temp'];
        document.getElementById('min_temp').innerHTML = data['min_temp'];
        document.getElementById('weatherInfo').innerHTML = data['description'];
    } catch (error) {
        console.log('updateUI error:', error);
    // appropriately handle the error
    }
};

const updateImg = async (imgURL) => {
    const request = await fetch('http://localhost:8081/trapp');
    try {
        document.getElementById('pixaimg').setAttribute('src', imgURL); 
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
