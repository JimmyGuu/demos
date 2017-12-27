;
(function (window, document, Jehorn) {
    var Pager = function (options) {
        if (this instanceof Pager) {
            this.version = '1.0.0';
            this.options;
        } else {
            return new Pager(options);
        }
    }

    Jehorn(Pager, 'Tools');
    Pager.prototype = {
        getVersion: function () {
            return this.version;
        }
    }

    window.Pager = Pager;

})(window, document, Jehorn);