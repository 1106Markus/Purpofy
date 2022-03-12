const { append } = require('express/lib/response');
const { default: mongoose } = require('mongoose');

const questionsSchema = new mongoose.Schema({
    text: String,
    order: Number,
    weight: Number,
});

const Question = mongoose.model('Question', questionsSchema);
model.exports = Question;

const questions = [
    {
        text: "Here goes first question",
        order: 1,
        weight: 0
    },
    {
        text: "Second question",
        order: 2,
        weight: 0
    }
]

// should I do route with query


Question.insertMany(questions);




/*
const questions = ["Hello"];

questions.forEach((question, index) => {
    const firstQuestion = new Question({ text: question, order: index });
    firstQuestion.save();
});

const allQuestions = Question.find({});
*/