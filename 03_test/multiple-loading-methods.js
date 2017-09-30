(function (factory) {
	// 支持多种加载方式

	if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'moment'], factory);
    }
    else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'), require('moment'));
    }
    else {
        // Browser globals
        factory(jQuery, moment);
    }
} (function ($, moment) {
	console.log($)
}));