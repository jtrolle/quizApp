module.exports = {
    'events': {
    	'config:ready': [
    		{'callback': require('./index.js').init}
    	],
        'home:fadeout:after': [
           {'callback': require('./index.js').showQuiz}
        ],
        'quiz:response': [
        	{'callback': require('./index.js').listenResponse}
        ]
    },
};
