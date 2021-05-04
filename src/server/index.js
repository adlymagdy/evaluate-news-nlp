const dotenv = require('dotenv').config();
var path = require('path')
const express = require('express')
const fetch = require('node-fetch');
const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
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
    const apiKey = "?key=6f4519624ab51c4735a3b2c8195d1c40"
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
        const response = await fetch(url);
        const json = await response.json();
        return json;

    } catch (error) {
        console.log(error);
    }
}

// api request to meaning cloud 

app.get('/sentiment-analysis', async (req, res) => {
    console.log('this is req.query.input:', req.query.input)
    let analysisUrl = await getUrl(req.query.input);
    let fullAnalysis = await getData(analysisUrl)
    console.log("this is the complete response: ", + fullAnalysis);
    let sentimentAnalysis = {
        source: req.query.input,
        agreement: fullAnalysis.agreement,
        confidence: fullAnalysis.confidence,
        irony: fullAnalysis.irony,
        subjectivity: fullAnalysis.subjectivity
    }
    res.send(sentimentAnalysis)
})