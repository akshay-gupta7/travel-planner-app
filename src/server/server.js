var path = require('path')
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

// designates what port the app will listen to for incoming requests
const port = 7168;

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

/*let apikey={};
apikey['key'] = process.env.API_KEY;*/

app.listen(port, function () {
    console.log('Example app listening on port ', port)
    //console.log('Your API key is', apikey)
})



app.get('/api', function (req, res) {
    console.log("and here")
    res.send(apikey)
})
