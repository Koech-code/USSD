const express = require('express')
const bodyParser = require("body-parser");

const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable cross-origin resource sharing

app.post('/ussd', (req, res)=>{
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text
    } = req.body

    let response = ""
    if (text==""){
        // this means it's the first request
        response = `CON what would you like to check ?
        1. My Account
        2. My Phone Number
        `;
    } else if (text=="1"){
        // Business logic for first level response
        response = `CON Choose account information you want to view
        1. Account Balance
        2. Account Balance
        `
    } else if (text=="2"){
        // Terminal request
        response = `END Your phone number is ${phoneNumber}`
    } else if (text == "1*1"){
        const accountNumber = "AC1240";
        // terminal request
        response = `END Your account number is ${accountNumber}`
    } else if(text=="1*2"){
        const balance = "KSH. 10, 000"
        response = `END Your balance is ${balance}`
    }

    // send response back to API
    res.set('Content-Type: text/plain')
    res.send(response)
})

module.exports = app;