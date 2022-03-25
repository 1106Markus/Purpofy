const express = require('express');
const app = express();
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
//const { dirname } = require('path');
const path = require('path');
const { default: mongoose } = require('mongoose');
const questions = require('./models/questions');
const mongo = require("./models");
const bodyParser = require('body-parser')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// completely random :). Just has to be secret in the json payload so nobody can manipulate it. IMPORTANT NOT TO CHANGE, because all previous jwt tokens would become invalid
const JWT_SECRET = 'yncoiahrewuwqr32flkncn/&$$%Gvgztd%$4TDf=)(%Egghjsdfg'

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


// REGISTRATION LOGIC COMES HERE 
app.use(bodyParser.json())

const { response } = require('express')

app.post('/api/change-password', async (req, res) => {
    const { token , newpassword: plainTextPassword} = req.body

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({
            status: 'error',
            error: 'Password too small. Should contain atleast 6 characters'
        })
    }

    try{
        const user = jwt.verify(token, JWT_SECRET)

        const _id = user.id

        const password = await bcrypt.hash(plainTextPassword, 10)

        await User.updateOne(
            { _id },
            {
                $set: { password }
            }
        )
        res.json({ status: 'ok' })
    } catch(error) {
        res.json({ status: 'error', error: ';))'})
    }
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({username }).lean()

    if(!user) {
        return res.json({status: 'error', error: 'Invalid username/password'})
    }

    if (await bcrypt.compare(password, user.password)) {
       // the username, password combination is successful 

        const token = jwt.sign({
            id: user._id, 
            username: user.username 
        }, JWT_SECRET
        )

       return res.json({status: 'ok', data: token})
    }

    res.json({status: 'error', error: 'Invalid username/password'})
})

app.post('/api/register', async (req, res) => {
    const { username, password: plainTextPassword } = req.body

    if(!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({
            status: 'error',
            error: 'Password too small. Should contain atleast 6 characters'
        })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    try { 
        const res = await User.create({
            username,
            password
        })
        console.log('User created successfully: ', response)
    } catch(error) {
        if(error.code === 11000) {
            // duplicate key
        return res.json({ status: 'error', error: 'Username already in use'})
    }
    throw error
}

    res.json({ status: 'ok' })
})










app.listen(8080, async() => {
    console.log("test");
    mongo.getInstance().initialize();
    console.log("Server is up and running on 8080");
})

