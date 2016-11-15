const jQuery = require('jquery');

const container = require('./../../core/container');
const Quiz = require('./../../service/quiz');
const questions = require('./questions');
const quizContainerTpl = require('./template/quiz-container.tpl'); 
const questionTpl = require('./template/question.tpl');
const endQuizTpl = require('./template/quiz-end.tpl');

const questionPerRow = 4;

let currentQuestion = 0;

const createQuestion = (question, $questionTpl) => {
    let $btnWrapper = $questionTpl.find('.proposals'),
        button,
        nbButtons = question.proposals.length,
        colClass = 'col-sm-' + (12 / nbButtons).toString();

    $questionTpl.find('.number span').text(('0' + (currentQuestion + 1)).substr(-2));
    $questionTpl.find('.question').text(question.question);
    question.proposals.forEach(function (proposal) {
        button = jQuery('<button class="proposal btn">' + proposal + '</button>');
        button.publish('quiz:response', {
                'answer': question.answer, 
                'proposal': proposal
            });
        $btnWrapper.append(jQuery('<div></div>').addClass(colClass).append(button));
    });

    return $questionTpl;
};

const showQuestion = () => {
    let $quizContainer = jQuery('#app .quiz-wrapper'),
        quiz = container.get('quiz'),
        $questionTpl = jQuery(questionTpl),
        question = quiz.getQuestion(currentQuestion);

    $quizContainer.find('.question-card').eq(currentQuestion).addClass('active');    
    $questionTpl = createQuestion(question, $questionTpl);

    setTimeout(function () {
        jQuery('#app').append($questionTpl);
    }, 1000);
};

const startQuiz = () => {
    showQuestion();
};

const endQuiz = () => {
    jQuery('#app').html(endQuizTpl);
};

const applyClassButton = (button, className) => {
    jQuery(button).addClass(className);
};

module.exports.closeQuestion = () => {
    jQuery('.question-wrapper').remove();
    console.log(currentQuestion + 1, questions.length);
    if (currentQuestion + 1 === questions.length) {
        endQuiz();
    } else {
        currentQuestion = currentQuestion + 1;
        showQuestion();
    }
};

module.exports.removeClassButton = (button) => {
    jQuery(button).removeClass('correct wrong');
};

module.exports.listenResponse = (response) => {
    let self = this,
        button = response.event.currentTarget,
        isCorrect = response.answer === response.proposal;

    applyClassButton(button, isCorrect ? 'correct' : 'wrong');

    setTimeout(function () {    
        if (isCorrect) {
            self.closeQuestion();
        } else {
            self.removeClassButton(button);
        }
    }, 1500);
};

module.exports.showQuiz = () => {
    let quiz = container.get('quiz'),
        $quizContainerTpl = jQuery(quizContainerTpl),
        $quizRow = $quizContainerTpl.find('.row'),
        nbQuestions = quiz.questions.length,
        questionRemain = nbQuestions,
        cardLastRow = nbQuestions % questionPerRow;

    quiz.questions.forEach(function (question) {
        let className = questionRemain <= cardLastRow ? (12/cardLastRow).toString() : '3',
            card = jQuery('<div class="question-card">Quest.</div>'),
            column = jQuery('<div class=col-sm"' + className + '"></div>');

        column.append(card);
        $quizRow.append(column);
        questionRemain = questionRemain - 1;
    });

    jQuery('#app').html($quizContainerTpl);

    setTimeout(startQuiz, 1000);
};

module.exports.init = () => {
    let quiz = new Quiz();

    questions.forEach(function (question) {
        quiz.addQuestion(question);
    });

    container.set('quiz',quiz);
};
