var path = require('path')
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

// designates what port the app will listen to for incoming requests
const port = 7245;

app.use(express.static('dist'))

console.log(__dirname)

const geo_api_key = process.env.GEO_API_KEY;
const weather_api_key = process.env.WEATHER_API_KEY;
const pix_api_key = process.env.PIX_API_KEY;

const keys={
    'geo_key': geo_api_key, 
    'weather_key' : weather_api_key,
    'pixa_key': pix_api_key
}

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.listen(port, function () {
    console.log('Example app listening on port ', port)
})



app.get('/key', function (req, res) {
    console.log("and here", keys)
    res.send(keys)
})