const Question = function (config) {
	this.question = config.question;
	this.proposals = config.proposals;
	this.answer = config.answer;
};

Question.prototype.getQuestion = function () {
	return this.question;
};

module.exports = Question;