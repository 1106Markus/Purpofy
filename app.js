const express = require('express');
const app = express();
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
//const { dirname } = require('path');
const path = require('path');
const { default: mongoose } = require('mongoose');

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

app.get("/questionnaire", (req, res) => {
    res.render('questionnaire')
})

app.get("/dashboard", (req, res) => {
    res.render('dashboard')
})

app.listen(8080, async() => {
    const url = 'mongodb+srv://Admin01:SiR0JngY2wkIB0cF@cluster0.bsxtm.mongodb.net/test';
const client = new MongoClient(url);

// Database Name
const dbName = 'test';

  try {
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
  } catch(error) {
      console.error(error);
  }
    console.log("Server is up and running on 8080");
})

const questionsSchema = new mongoose.Schema({
    questionOne: String,
    questionTwo: String,
    questionThree: String,
    questionFour: String,
    questionFive: String,
    questionSix: String,
    questionSeven: String,
    questionEight: String,
    questionNine: String,
    questionTen: String,
});

const Question = mongoose.model('Question', questionsSchema);
const firstQuestion = new Question({questionOne: "Test 123"});
firstQuestion.save();





