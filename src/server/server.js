var path = require('path')
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

// designates what port the app will listen to for incoming requests
const port = 7171;

app.use(express.static('dist'))

console.log(__dirname)

const geo_api_key = process.env.GEO_API_KEY;
const weather_api_key = process.env.WEATHER_API_KEY;
const pix_api_key = process.env.PIX_API_KEY;

const geo_base_url = 'http://api.geonames.org/searchJSON?q';
const weather_base_url = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const pix_base_url = 'https://pixabay.com/api/?'

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.listen(port, function () {
    console.log('Example app listening on port ', port)
})



app.get('/api', function (req, res) {
    console.log("and here")
    res.send(apikey)
})