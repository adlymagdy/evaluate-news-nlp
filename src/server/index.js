const dotenv = require('dotenv');
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
dotenv.config();

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const getUrl = (formInput) => {
    const baseUrl = "https://api.meaningcloud.com/sentiment-2.1"
    const apiKey = "?key=" + process.env.api_key
    const link = "&url=" + formInput
    const lang = "&lang=en"
    const model = "&model=general"
    const apiUrl = `${baseUrl}${apiKey}${link}${lang}${lang}${model}`
    console.log(apiUrl)
    return apiUrl;
}