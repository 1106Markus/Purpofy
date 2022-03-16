const express = require('express');
const app = express();
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
//const { dirname } = require('path');
const path = require('path');
const { default: mongoose } = require('mongoose');
const questions = require('./models/questions');
const mongo = require("./models");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public/stylesheets')))
app.use(express.static(path.join(__dirname, 'routes')))
app.use(express.static(path.join(__dirname, 'Purpofy')))
app.use(express.static(path.join(__dirname, 'routes/homepage')))

app.use(morgan('short'))
// this will display the full info about the http requests

app.get("/", (req, res) => {
    res.render('home')// should respond with index.html file
})

app.get("/dashboard", (req, res) => {
    res.render('dashboard')
})

app.get("/registration", (req, res) => {
    res.render('registration')
})

app.get("/login", (req, res) => {
    res.render('login')
})

app.get("/change-password", (req, res) => {
    res.render('change-password')
})

// attempt

app.get("/questionnaire", async (req, res) => {
    const questionsToLoad = await questions.find({});
    console.log("a", questions)
    res.render('questionnaire', { questions: questionsToLoad })
})

app.get("/answers", (req, res) => {
    console.log("data", req.params);

    req.params.answers.forEach(answer => {
        const newAnswer = new AnswerModel();
        newAnswer.order = answer.order;
        newAnswer.text = answer.text;
        newAnswer.value = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"][answer.text] - 2;
    });
});

app.listen(8080, async() => {
    console.log("test");
    mongo.getInstance().initialize();
    console.log("Server is up and running on 8080");
})

