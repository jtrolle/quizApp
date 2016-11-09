module.exports = {
    'events': {
        'config:ready': [
            {
                'callback': () => {
                    require('./service/jQueryBindPlugin');
                },
            },
        ],
    },
    'bundles': {
        'home': require('./bundle/home/config'),
        'quiz': require('./bundle/quiz/config')
    },
};
