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

// POST user input

const data = []
app.post('/form', addInput)
function addInput (req, res) {
    data.push(req.body)
}



// Get api analysis url
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
// fetch api request

const getData = async url => {
    try {
        const res = await fetch (url);
        const json = await res.json();
        return json
    } catch (error) {
        console.log(error)
    }
}

// api request to meaning cloud 

app.get('/sentiment-analysis', async (req, res) => {
    let analysisUrl = await getUrl(req.query.input);
    let fullAnalysis = await getData(analysisUrl)
    let sentimentAnalysis = {
        source: req.query.input,
        agreement: fullAnalysis.agreement,
        confidence: fullAnalysis.confidence,
        irony: fullAnalysis.irony,
        subjectivity: fullAnalysis.subjectivity
    }
    res.send(sentimentAnalysis)
})