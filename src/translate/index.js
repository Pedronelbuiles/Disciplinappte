// definicion de intl y locale-data para la visualización de relative format en zafari.
if (!window.intl) {
	window.intl = require('intl');
	require('intl/locale-data/jsonp/en-US.js');
	require('intl/locale-data/jsonp/es.js');
}

var IntlRelativeFormat = window.IntlRelativeFormat = require('intl-relativeformat');
var IntlMessageFormat = require('intl-messageformat');

require('intl-relativeformat/dist/locale-data/en.js');
require('intl-relativeformat/dist/locale-data/es.js');

var es = require('./es.js');
var en = require('./en.js');

var MESSAGE = {};
MESSAGE.es = es;
MESSAGE.en = en;

var locale = localStorage.locale || 'es';

module.exports = {
	message: function(text , opts){
		opts = opts || {};
		var msg = new IntlMessageFormat(MESSAGE[locale][text], locale, null);
		return msg.format(opts);
	},
	date: new IntlRelativeFormat(locale)
}
