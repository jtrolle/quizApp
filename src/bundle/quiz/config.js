module.exports = {
    'events': {
        'home:fadeout:after': [
           {'callback': require('./index.js').load}
        ]
    },
};
