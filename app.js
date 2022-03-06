const express = require('express');
const app = express();
const morgan = require('morgan');
//const { dirname } = require('path');
const path = require('path');

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

app.listen(8080, () => {
    console.log("Server is up and running on 8080");
})





