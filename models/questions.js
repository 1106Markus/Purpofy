const { default: mongoose } = require('mongoose');
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

const questionsArray = new mongoose.Schema({
    questions: [questionsSchema],
})

const Question = mongoose.model('Question', questionsSchema);
const firstQuestion = new Question({questionOne: "Test 123"});
firstQuestion.save();

const questArray = mongoose.model('QuestionArray', questionsArray);
const questionsForQ = new questArray({firstQuestion});

model.exports = Question;