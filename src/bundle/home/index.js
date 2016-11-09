const jQuery = require('jquery');
const container = require('./../../core/container');

const homeTpl = require('./template/home.tpl');

let emitter = container.get('emitter');

module.exports.load = () => {
    let home = jQuery(homeTpl);

    home.find('.btn').publish('home:button:click');
    jQuery('#app').append(home);
};

module.exports.fade = () => {
    jQuery('#app>.cover-container').addClass('zoomOut');
    setTimeout(function () {
        emitter.emit('home:fadeout:after');
    }, 1000);
};