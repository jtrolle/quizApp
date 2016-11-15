const Question = require ('./question');

const Quiz = function () {
    this.questions = [];
};

Quiz.prototype.addQuestion = function (question) {
    this.questions.push(new Question(question));
};

Quiz.prototype.getQuestion = function (index) {
    return this.questions[index];
};

module.exports = Quiz;