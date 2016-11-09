module.exports = {
    'events': {
        'config:ready': [
            {'callback': require('./index.js').load},
        ],
        'home:button:click': [
           {'callback': require('./index.js').fade}
        ]
    },
};
