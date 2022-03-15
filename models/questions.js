
const { default: mongoose } = require('mongoose');

const questionsSchema = new mongoose.Schema({
    text: String,
    order: Number,
    weight: Number,
});

module.exports = mongoose.model('Question', questionsSchema);

