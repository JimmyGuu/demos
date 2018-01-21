
;(function (global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof  module.exports === 'object') {
        module.exports = global.document
            ? factory(global, true)
            : function (win) {
                if (!win.document) {
                    throw new Error('MyPagination 需要一个包含 document 的 window 对象');
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    'use strict';

    var _isDebug = true;

    var MyPagination = function (selector, config) {
        return new MyPagination.prototype._init(selector, config);
    }

    var _regs = {
        pos_integer: /^[1-9]\d*$/, // Positive integer
        non_negative_integer: /^\d+$/, // Non-negative integer
        space_remove: /^\s+|\s+$/g, // Remove space on front and end
        get_tip_crt: /n/,
        get_tip_total: /m/
    };

    var _consts = {
        PAGE_SIZE: 10,
        PAGE_CURRENT: 1,
        PAGE_RANGE: 5,
        TOTAL: 0,
        PREV_TEXT: '上一页',
        NEXT_TEXT: '下一页',
        FIRST_TEXT: null,
        LAST_TEXT: null,
        GO_TEXT: 'GO',
        TIP_TEXT: '第n页/共m页',
        MORE_TEXT: '...',
        IS_PREV: true,
        IS_NEXT: true,
        IS_FIRST: true,
        IS_LAST: true,
        IS_SPACE: true,
        IS_GO: false,
        IS_TIP: true,
        IS_PAGE: true,
        TIP_POSITION: 'left',
        TIP_POSITIONS: ['left', 'right'],
        CONTAINER_CLASSNAME: 'my-pagination-contianer',
        BTN_CLASSNAME: 'pager-btn',
        PREV_BTN_CLASSNAME: 'pager-btn-prev',
        NEXT_BTN_CLASSNAME: 'pager-btn-next',
        FIRST_BTN_CLASSNAME: 'pager-btn-first',
        LAST_BTN_CLASSNAME: 'pager-btn-last',
        GO_BTN_CLASSNAME: 'pager-btn-go',
        GO_INPUT_CLASSNAME: 'pager-input-go',
        GO_BOX_CLASSNAME: 'pager-go-box',
        TIP_CLASSNAME: 'pager-tip',
        RIGHT_MORE_CLASSNAME: 'more-right',
        LEFT_MORE_CLASSNAME: 'more-left',
        PAGE_BOX_CLASSNAME: 'pager-btn-box',
        CURRENT_CLASSNAME: 'active'
    };

    var _utils = (function () {
        var tools = {};

        tools.isStr = function (val) {
            if (typeof val === 'string') return true;
            return false;
        }
        tools.isArr = function (val) {
            if (typeof val === 'object' && val.length) return true;
            return false;
        }
        tools.isDOM = (typeof HTMLElement === 'object')
            ? function (obj) {
                return obj instanceof HTMLElement;
            }
            : function (obj) {
                return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
            };

        // Class inheritance.
        // @param  {Function} Child  Child class.
        // @param  {Function} Parent Parent class.
        tools.extend = function (Child, Parent) {
            var F = function () { };
            F.prototype = Parent.prototype;
            Child.prototype = new F();
            Child.prototype.constructor = Child;
            Child.uber = Parent.prototype;
        }

        // Console log.
        tools.l = function () {
            if (_isDebug) {
                for (var i = 0; i < arguments.length; i++) {
                    console.log('%c DEBUG!!MyPagination debug info: ', 'background: #ff5f00;color: #fff;', arguments[i]);
                }
            }
        }

        tools._tests = function (reg, strs) {
            var is_true = true;
            for (var i = strs.length - 1; i >= 0; i--) {
                var r = reg.test(strs[i]);
                if (!r) {
                    this.l('An error positive occurred when comparing with regular expressions: ' + strs[i]);
                    return is_true = false;
                }
            }

            return is_true;
        }
        // Check string is positive integer.
        tools.isPosInteger = function () {
            return this._tests(_regs.pos_integer, arguments);
        }
        tools.isNonNegativeInteger = function () {
            return this._tests(_regs.non_negative_integer, arguments);
        }
        tools.replaceSpace = function (str) {
            return ('' + str).replace(_regs.space_remove, '');
        }
        tools.isDefault = function (val, def) {
            return val = val === !def ? !def : def;
        }

        tools.createEleA = function (href) {
            href = href || 'javascript: void(0);';
            var a = document.createElement('a');
            a.href = href;
            return a;
        }

        tools.getTextFromArr = function (target, arr) {
            var _target = null;
            for (var i = arr.length - 1; i >= 0; i--) {
                if (target === arr[i]) {
                    _target = arr[i];
                }
            }
            return _target;
        }

        tools.setClasses = function (ele, classes) {
            if (this.isStr(classes)) {
                ele.className = classes;
            } else if (this.isArr(classes)) {
                var c = '';
                for (var i = 0; i < classes.length; i++) {
                    c += (' ' + classes[i]);
                }
                ele.className = c;
            }
        }
        tools.addClass = function (ele, classes) {
            var _classname = ele.className;
            if (this.isStr(classes)) {
                ele.className = _classname + ' ' + classes;
            } else if (this.isArr(classes)) {
                var c = _classname;
                for (var i = 0; i < classes.length; i++) {
                    c += (' ' + classes[i]);
                }
                ele.className = c;
            }
        }
        tools.removeClass = function (ele, classes) {
            var _classname = ele.className;
            if (this.isStr(classes)) {
                var _reg = new RegExp('\\s' + classes + '\\s', 'g');
                _classname = _classname.replace(_reg, '');
                ele.className = _classname;
            } else if (this.isArr(classes)) {
                for (var i = 0; i < classes.length; i++) {
                    var _reg = new RegExp('\\s' + classes[i] + '\\s', 'g');
                    _classname = _classname.replace(classes[i], '');
                }
                ele.className = _classname;
            }
        }

        tools.bindClick = function (ele, fn) {
            ele.addEventListener('click', fn);
        }
        tools.bindClicks = function (ele, fn) {
            if (this.isDOM(ele)) {
                this.bindClick(ele, fn);
            } else if (this.isArr(ele)) {
                for (var i = ele.length - 1; i >= 0; i--) {
                    if (this.isDOM(ele[i])) this.bindClick(ele[i], fn);
                }
            }
        }

        return tools;
    })();

    MyPagination.prototype = {
        render: function (current) {
            current = _utils.isPosInteger('' + current) ?  +current : _consts.PAGE_CURRENT;
            this.options.pageCurrent = current;
            this.clear();
            this.doms = this._renderDOM(this.doms);
            this._bindEvent();
        },
        clear: function () {
            this.options.wrapper.innerHTML = '';
        },
        _getWrapper: function (selector) {
            try {
                return document.querySelector('' + selector);
            } catch (e) {
                _utils.l(e.message);
                throw new Error('获取分页容器失败!请确认第一个参数正确!');
            }
        },
        _configInit: function (options) {
            var opts = options || {};

            // The number of data entries per page is displayed.
            opts.pageSize = _utils.isPosInteger('' + opts.pageSize) ?  +opts.pageSize : _consts.PAGE_SIZE;
            // Current page index.
            opts.pageCurrent = _utils.isPosInteger('' + opts.pageCurrent) ?  +opts.pageCurrent : _consts.PAGE_CURRENT;
            // How many page buttons are displayed.
            opts.pageRange = _utils.isNonNegativeInteger('' + opts.pageRange) ?  +opts.pageRange : _consts.PAGE_RANGE;
            // The total length of datas.
            opts.total = _utils.isNonNegativeInteger('' + opts.total) ?  +opts.total : _consts.TOTAL;

            opts.prevText = opts.prevText ? _utils.replaceSpace(opts.prevText) : _consts.PREV_TEXT;
            opts.nextText = opts.nextText ? _utils.replaceSpace(opts.nextText) : _consts.NEXT_TEXT;
            opts.firstText = opts.firstText ? _utils.replaceSpace(opts.firstText) : _consts.FIRST_TEXT;
            opts.lastText = opts.lastText ? _utils.replaceSpace(opts.lastText) : _consts.LAST_TEXT;
            opts.goText = opts.goText ? _utils.replaceSpace(opts.goText) : _consts.GO_TEXT;
            opts.tipText = opts.tipText ? _utils.replaceSpace(opts.tipText) : _consts.TIP_TEXT;

            opts.isPrev = _utils.isDefault(opts.isPrev, _consts.IS_PREV);
            opts.isNext = _utils.isDefault(opts.isNext, _consts.IS_NEXT);
            opts.isFirst = _utils.isDefault(opts.isFirst, _consts.IS_FIRST);
            opts.isLast = _utils.isDefault(opts.isLast, _consts.IS_LAST);
            opts.isSpace = _utils.isDefault(opts.isSpace, _consts.IS_SPACE);
            opts.isGo = _utils.isDefault(opts.isGo, _consts.IS_GO);
            opts.isTip = _utils.isDefault(opts.isTip, _consts.IS_TIP);
            opts.isPage = _utils.isDefault(opts.isPage, _consts.IS_PAGE);

            opts.tipPosition = _utils.getTextFromArr(opts.tipPosition, _consts.TIP_POSITIONS) ? opts.tipPosition : _consts.TIP_POSITIONS[0];

            return opts;
        },
        _create: function () {
            this.doms = this._createDOM();
        },
        _createDOM: function () {
            var options = this.options;
            var pageContainer = document.createElement('div');
            var prevBtn =  _utils.createEleA(),
                nextBtn = _utils.createEleA(),
                firstBtn = _utils.createEleA(),
                lastBtn = _utils.createEleA();
            var tip = document.createElement('span');
            var goBox = document.createElement('span'),
                goBtn = _utils.createEleA(),
                goInput = document.createElement('input');
            var pageBox = document.createElement('span');

            var doms = {
                pageContainer: pageContainer,
                prevBtn: prevBtn,
                nextBtn: nextBtn,
                firstBtn: firstBtn,
                lastBtn: lastBtn,
                tip: tip,
                goBox: goBox,
                goBtn: goBtn,
                goInput: goInput,
                pageBox: pageBox
            };

            return doms
        },
        _renderDOM: function (doms) {
            var options = this.options;
            var container = doms.pageContainer;
            var pages = this._mathPage();

            // Default text.
            doms.prevBtn.innerHTML = options.prevText;
            doms.nextBtn.innerHTML = options.nextText;
            doms.goBtn.innerHTML = options.goText;
            doms.firstBtn.innerHTML = pages.first;
            doms.lastBtn.innerHTML = pages.last;

            // If you specify the text for prev and next,
            // the text you specified will be displayed.
            if (options.firstText) doms.firstBtn.innerHTML = options.firstText;
            if (options.lastText) doms.lastBtn.innerHTML = options.lastText;

            // Is display the prev/next button.
            if (options.isPrev) container.appendChild(doms.prevBtn);
            if (options.isFirst) container.appendChild(doms.firstBtn);

            // Is display the ellipsis on left.
            if (pages.isLeft) {
                var leftMore = document.createElement('span');
                leftMore.innerHTML = _consts.MORE_TEXT;
                _utils.setClasses(leftMore, [_consts.BTN_CLASSNAME, _consts.LEFT_MORE_CLASSNAME]);
                doms.pageBox.appendChild(leftMore);
            }

            // Page number buttons.
            var pageBtns = [];
            for(var i = 0; i < pages.inside.length; i++) {
                var page = _utils.createEleA();
                page.innerHTML = pages.inside[i];
                _utils.setClasses(page, [_consts.BTN_CLASSNAME, _consts.BTN_CLASSNAME + '-' + pages.inside[i]]);
                if (pages.inside[i] === pages.current) {
                    _utils.addClass(page, _consts.CURRENT_CLASSNAME);
                }

                doms.pageBox.appendChild(page);
                pageBtns.push(page);
            }
            if (options.isPage) container.appendChild(doms.pageBox);

            // Is display the ellipsis on right.
            if (pages.isRight) {
                var rightMore = document.createElement('span');
                rightMore.innerHTML = _consts.MORE_TEXT;
                _utils.setClasses(rightMore, [_consts.BTN_CLASSNAME, _consts.RIGHT_MORE_CLASSNAME]);
                doms.pageBox.appendChild(rightMore);
            }

            if (options.isLast) container.appendChild(doms.lastBtn);
            if (options.isNext) container.appendChild(doms.nextBtn);

            // Is display the tip text and it's position.
            if (options.isTip) {
                options.tipText = options.tipText.replace(_regs.get_tip_crt, pages.current);
                options.tipText = options.tipText.replace(_regs.get_tip_total, pages.total);
                doms.tip.innerHTML = options.tipText;

                switch (options.tipPosition) {
                    case _consts.TIP_POSITIONS[0]:
                        // left
                        container.insertBefore(doms.tip, container.children[0]);
                        break;
                    case _consts.TIP_POSITIONS[1]:
                        // right
                        container.appendChild(doms.tip);
                        break;
                }
            }

            // Is display the "go" button and input.
            if (options.isGo) {
                doms.goBox.appendChild(doms.goInput);
                doms.goBox.appendChild(doms.goBtn);
                container.appendChild(doms.goBox);
            }

            _utils.l(pages);
            this._setDOMStyle(doms, pages);

            options.wrapper.appendChild(container);

            doms.pageBtns = pageBtns;
            return doms;
        },
        _setDOMStyle: function (doms, pages) {
            _utils.setClasses(doms.firstBtn, [
                _consts.BTN_CLASSNAME,
                _consts.FIRST_BTN_CLASSNAME,
                _consts.BTN_CLASSNAME + '-' + pages.first]);
            _utils.setClasses(doms.lastBtn, [
                _consts.BTN_CLASSNAME,
                _consts.LAST_BTN_CLASSNAME,
                _consts.BTN_CLASSNAME + '-' + pages.last]);
            _utils.setClasses(doms.prevBtn, [
                _consts.BTN_CLASSNAME,
                _consts.PREV_BTN_CLASSNAME,
                _consts.BTN_CLASSNAME + '-' + pages.prev]);
            _utils.setClasses(doms.nextBtn, [
                _consts.BTN_CLASSNAME,
                _consts.NEXT_BTN_CLASSNAME,
                _consts.BTN_CLASSNAME + '-' + pages.next]);
            _utils.setClasses(doms.tip, [_consts.TIP_CLASSNAME]);
            _utils.setClasses(doms.goBox, [_consts.GO_BOX_CLASSNAME]);
            _utils.setClasses(doms.goBtn, [_consts.BTN_CLASSNAME, _consts.GO_BTN_CLASSNAME]);
            _utils.setClasses(doms.goInput, [_consts.GO_INPUT_CLASSNAME]);
            _utils.setClasses(doms.pageContainer, [_consts.CONTAINER_CLASSNAME]);
            _utils.setClasses(doms.pageBox, [_consts.PAGE_BOX_CLASSNAME]);

            if (pages.first === pages.current) {
                _utils.addClass(doms.firstBtn, _consts.CURRENT_CLASSNAME);
            }
            if (pages.last === pages.current) {
                _utils.addClass(doms.lastBtn, _consts.CURRENT_CLASSNAME);
            }

            return doms;
        },
        _mathPage: function () {
            var options = this.options;
            var totalPage = Math.ceil(options.total / options.pageSize),
                firstPage = 1,
                pageRange = options.pageRange,
                current = options.pageCurrent,
                isPage = options.isPage;

            var prevPage = (current - 1) < firstPage ? firstPage : (current - 1),
                nextPage = (current + 1) > totalPage ? totalPage : (current + 1);

            var pageBtnObj = {
                current: current,
                total: totalPage,
                prev: prevPage,
                next: nextPage,
                first: firstPage,
                last: totalPage,
                isRight: false,
                isLeft: false,
                inside: []
            };
            var getInsidePage = function (min, max) {
                var _arr = [];
                for (var i = min; i <= max; i++) {
                    _arr.push(i);
                }
                return _arr;
            }

            if (totalPage > pageRange && pageRange > 3) {
                // 总页数大于分页显示个数 && 显示个数大于3
                var overflowPages = totalPage - pageRange;
                if (current <= (pageRange - 2)) {
                    // 仅右侧省略号 123...n
                    var _arr = getInsidePage(firstPage + 1, (firstPage + pageRange - 2));
                    pageBtnObj.inside = _arr;
                    pageBtnObj.isRight = true;
                    return pageBtnObj;
                } else if (current >= (totalPage - 2)) {
                    // 仅左侧省略号 1...(n-1)n
                    var _start = totalPage - 2 - (pageRange - 2 - 1 - 1),
                        _end = totalPage - 1;
                    var _arr = getInsidePage(_start, _end);

                    pageBtnObj.inside = _arr;
                    pageBtnObj.isLeft = true;
                    return pageBtnObj;
                } else {
                    // 两边省略号 1...m...n
                    var _prevCount = Math.ceil((pageRange - 2) / 2),
                        _nextCount = pageRange - 2 - _prevCount - 1;
                    var _start = current - _prevCount,
                        _end = current + _nextCount;
                    var _arr = getInsidePage(_start, _end);

                    pageBtnObj.inside = _arr;
                    pageBtnObj.isRight = true;
                    pageBtnObj.isLeft = true;
                    return pageBtnObj;
                }
            }

            if (pageRange === 3) {
                if (current <= 2) {
                    pageBtnObj.inside = [2];
                    pageBtnObj.isRight = true;
                    return pageBtnObj;
                } else if (current >= 9) {
                    pageBtnObj.inside = [9];
                    pageBtnObj.isLeft = true;
                    return pageBtnObj;
                } else {
                    pageBtnObj.inside = [current];
                    pageBtnObj.isRight = true;
                    pageBtnObj.isLeft = true;
                    return pageBtnObj;
                }
            }

            return pageBtnObj;
        },
        _bindEvent: function () {
            _utils.bindClicks([
                this.doms.prevBtn,
                this.doms.nextBtn,
                this.doms.firstBtn,
                this.doms.lastBtn
            ], this._changeEvent);
            _utils.bindClicks(this.doms.pageBtns, this._changeEvent);
        },
        _changeEvent: function (e) {
            var _reg = new RegExp('\\s' + _consts.BTN_CLASSNAME + '-(\\d+)', '');
            var page = _reg.exec(e.currentTarget.className)[1];
            _utils.l(page);
            console.log(this);
            return page;
        }
    };

    var init = MyPagination.prototype._init = function (selector, config) {
        if (!selector) return this; // Block external use this method.

        config.wrapper = this._getWrapper(selector);
        this.options = this._configInit(config);
        this._create(this.options);
        this.render(this.options.pageCurrent);

        return this;
    };

    init.prototype = MyPagination.prototype;

    // Alias
    init.prototype.init = MyPagination.prototype.render;
    init.prototype.destroy = MyPagination.prototype.clear;

    // Browser
    if (!noGlobal) window.myPagination = MyPagination;

    // AMD
    return myPagination;
}));