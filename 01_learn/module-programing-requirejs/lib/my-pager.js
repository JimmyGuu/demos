;(function (factory) {
    if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('document'), require('window'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory(document, window));
    } else {
        // Browser globals
        factory(document, window);
    }
}(function (document, window) {
    var Test = {
        a: 1
    }

    if (typeof module != 'undefined' && module.exports) {
        module.exports = Test;
    } else if (typeof define == 'function' && define.amd) {
        define(function () { return Test; });
    } else {
        window.Test = Test;
    }
}));