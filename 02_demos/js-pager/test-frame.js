/**
 * Jehorn
 * Personal plugins frame
 * @author Jehorn(gerardgu@outlook.com)
 * @version 1.0.0
 */
;
(function (window, document) {
    var isJehorn = false;

    function JehornFactory(subType, superType) {
        if (typeof JehornFactory[superType] === 'function') {
            var F = function () { };
            F.prototype = new JehornFactory[superType]();
            subType.prototype = new F();
            subType.prototype.constructor = subType;
            subType.uber = superType.prototype;
        } else {
            throw new Error('ERR! This abstract class was not be created!');
        }
    }

    // General tools
    JehornFactory.Tools = function () {
        this.type = 'Tools';
    }
    JehornFactory.Tools.prototype = {
        // Version - Have to override
        getVersion: function () {
            return new Error('ERR! Abstract method can not be used!');
        }
    }

    // General ui components
    JehornFactory.Components = function () {
        this.type = 'Components';
    }
    JehornFactory.Components.prototype = {
        // Version - Have to override
        getVersion: function () {
            return new Error('ERR! Abstract method can not be used!');
        }
    }

    var Utils = new (function () {
        // 循环设置默认属性 注意需要设置原始参数为false等的必须使用excluded
        // @param {Object} options 传入属性对象
        // @param {Object} defaults 默认属性对象
        // @param {Array} excluded 设置完全等于属性数组 [{attr: 'name', val: 'value'}]
        // @param {string} excluded[index].attr 属性名称
        // @param {string} excluded[index].val 判断属性是否完全等于的值
        this.setObjectOption = function (options, defaults, excluded) {
            var opts = {};
            _options = options || {},
                arr = excluded || [];

            for (var opt in defaults) {
                opts[opt] = _options[opt] || defaults[opt];
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (opt === arr[i].attr) {
                        opts[opt] = _options[opt] === arr[i].val ? _options[opt] : defaults[opt];
                    }
                }
            }

            return opts;
        }
    })();

    var Jehorn = {
        Pager: function (options) {
            if (this instanceof Pager) {
                this.version = '1.0.0';
                this.options = options || {};
                this._initOptions();
            } else {
                return new Jehorn.Pager(options);
            }
        }
    }

    JehornFactory(Jehorn.Pager, 'Tools');
    Jehorn.Pager.prototype = {
        _DefaultOptions:  function () {
            this.isJehorn = false;
        },
        _initOptions: function () {
            var _default = new _DefaultOptions();

            console.log(Utils);

        },
        getVersion: function () {
            return this.version;
        }
    }

    var _export = function (type, fn) {
        if (typeof module != 'undefined' && module.exports) {
            module.exports = fn;
        } else if (typeof define == 'function' && define.amd) {
            define(function () { return fn; });
        } else {
            window[type] = fn;
        }
    }

    for (var type in Jehorn) {
        _export(type, Jehorn[type]);
    }

})(window, document);
