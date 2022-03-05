const express = require('express');
const app = express();
const morgan = require('morgan');
const { dirname } = require('path');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

//app.use(express.static('development/index.html'))
app.use(express.static('public'))

app.use(morgan('short'))
// this will display the full info about the http requests
//app.use(morgan('combined'))

app.get("/", (req, res) => {
    //console.log("Responding from index route")
    res.render('home')// should respond with index.html file
})

app.get("/questionnaire", (req, res) => {
    var user1 = {firstName: "Aaron", lastName: "Carlson"}
    const user2 = {firstName: "Admin", allRights: true}
    res.render('questionnaire')
    //res.json([user1, user2])
    //console.log("Responding from the quesstionnaire route");
    //res.send("Questionnaire"); 
    // should load the questionnaire.html fhile
})

app.get("/dashboard", (req, res) => {
    
})

app.listen(8080, () => {
    console.log("Server is up and running on 8080");
})
