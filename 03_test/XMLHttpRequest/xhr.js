/*!
 * xhr.js
 * Based on XMLHttpRequest.
 * @param  {Object}   global  window
 * @param  {Function} factory function
 * @return {Object}   xhr
 */
;(function (global, factory) {
    'use strict';

    // For CommonJS
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document
        module.exports = global.document
            ? factory(global, true)
            : function (win) {
                if (!win.document) {
                    throw new Error('XHR requires a window with a document');
                }
                return factory(win);
            };
    } else {
        factory(global);
    }
} (typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    'use strict';

    var TYPES = ['GET', 'POST'];
    var RES_TYPES = ['default', '', 'text', 'document', 'json', 'blob', 'arrayBuffer'];
    var CONTENT_TYPES = ['default', 'application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'];
    var DATA_TYPES = ['json'];
    var LAST_PATH = /\\(?!.*\\+.*)/; // 路径中的最后一个反斜杠

    var utils = {
        find: function (arr, val) {
            var _isContain = false;
            for (var i  = arr.length - 1; i >= 0; i--) {
                if (arr[i] === val) {
                    _isContain = true;
                }
            }
            return _isContain;
        },
        isNative: function (api) {
            return /native code/.test(api.toString()) && typeof api !== 'undefined';
        },
        getRandom: function () {
            return Math.random().toString(16).substr(2);
        },
        getUrlParam: function (url, datas, and, equal) {
            var isParamed = /[?]/.test(url);
            and = and || '&';
            equal = equal || '=';
            var str = isParamed ? and : '?';
            for (var i in datas) {
                if (datas.hasOwnProperty(i)) {
                    str += (i + equal + datas[i] + and)
                }
            }

            var reg = new RegExp('[' + and + ']$');
            str = str.replace(reg, '');

            return (url + str);
        }
    };

    function XHR(options) {
        if (this instanceof XHR) {
            this._options = options || {};

            this._init();

            this.request();
        } else {
            return new XHR(options);
        }
    }

    XHR.prototype = {
        /**
         * Options initialize
         * @private
         * @return {void}
         */
        _init: function () {
            var self = this;

            this.isDebug = this._options.debug === true ? true : false;
            this.url = this._options.url || '';
            this.timeout = this._options.timeout || 0;
            this.type = utils.find(TYPES, ('' + this._options.type).toUpperCase())
                ? ('' + this._options.type).toUpperCase()
                : TYPES[0];
            this.async = this._options.async === false ? false : true;
            this.responseType = utils.find(RES_TYPES, ('' + this._options.responseType).toLowerCase())
                ? ('' + this._options.responseType).toLowerCase()
                : RES_TYPES[0];
            this.contentType = utils.find(CONTENT_TYPES, ('' + this._options.contentType).toLowerCase())
                ? this._options.contentType
                : CONTENT_TYPES[0];
            // 目前只支持json
            this.dataType = utils.find(DATA_TYPES, ('' + this._options.dataType).toLowerCase())
                ? ('' + this._options.dataType).toLowerCase()
                : DATA_TYPES[0];
            this.data = this._options.data || {};
            this.form = this._options.form || null;
            this.requestHeader = this._options.requestHeader || {};
            this.updateProgress = typeof this._options.updateProgress === 'function'
                ? this._options.updateProgress
                : function () {};
            this.uploadProgress = typeof this._options.uploadProgress === 'function'
                ? this._options.uploadProgress
                : function () {};
            this.success = typeof this._options.success === 'function'
                ? this._options.success
                : function (responseText, status, xhr) { if (self.isDebug) { console.warn('Didn\'t specify the callback method of "success"');console.log(responseText, status, xhr); } };
            this.error = typeof this._options.error === 'function'
                ? this._options.error
                : function (responseText, status, xhr) { if (self.isDebug) console.log(responseText, status, xhr); };
            this.before = typeof this._options.before === 'function'
                ? this._options.before
                : function () {};
            this.end = typeof this._options.end === 'function'
                ? this._options.end
                : function () {};
            this.ontimeout = typeof this._options.ontimeout === 'function'
                ? this._options.ontimeout
                : function () {};
            this.onabort = typeof this._options.onabort === 'function'
                ? this._options.onabort
                : function () {};

            this._setContentType();
            if (this.contentType === CONTENT_TYPES[3]) {
                // 指定了request_header的Content-Type为 multipart/form-data
                this.formData = this._getFormData();
            }

            this._setUrl();

            return this;
        },
        _getFormData: function () {
            var formEle = document.querySelector(this.form);
            var formData = '';

            if (this.form && formEle) {
                // 指定了form选择器先从form获取数据
                formData = new FormData(formEle);
            }

            // 从data中获取数据
            for (var i in this.data) {
                if (this.data.hasOwnProperty(i)) {
                    formData.append(i, this.data[i]);
                }
            }

            return formData;
        },
        _setRequestHeader: function (xhr) {
            for (var i in this.requestHeader) {
                if (this.requestHeader.hasOwnProperty(i)) {
                    xhr.setRequestHeader(i, this.requestHeader[i]);
                }
            }
        },
        _setContentType: function () {
            // 如果没有指定Content-Type
            // 或者指定为 multipart/form-data
            // 不设置Content-Type
            if (this.contentType !== CONTENT_TYPES[0] &&
                this.contentType !== CONTENT_TYPES[3]) {
                this.requestHeader['Content-Type'] = this.contentType;
            }
        },
        _setUrl: function () {
            if (this.type === TYPES[0]) {
                this.url = utils.getUrlParam(this.url, this.data);
            }
        },
        request: function () {
            var self = this,
                isDebug = this.isDebug;
            var xhr = new XMLHttpRequest();

            xhr.open(this.type, this.url, this.async);
            xhr.timeout = this.timeout;
            this._setRequestHeader(xhr);
            if (this.responseType !== RES_TYPES[0]) {
                xhr.responseType = this.responseType;
            }
            // 下载progress事件
            xhr.onprogress = this.updateProgress;
            // 上传progress事件
    　　　　 xhr.upload.onprogress = this.uploadProgress;

            // 调用xhr.send()方法后立即触发
            xhr.onloadstart = function () {
                if (isDebug) console.warn('onloadstart...');
                self.before();
            }

            // 当请求成功完成时触发
            // 当http状态码为2xx或304时认为请求成功
            xhr.onload = function () {
                if (isDebug) console.warn('onload...');
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    if (isDebug) console.warn('request successed...');
                    self.success(xhr.responseText, xhr.status, xhr);
                    return;
                }

                if (isDebug) console.warn('request failed...');
                self.error(xhr.responseText, xhr.status, xhr);
            }

            // 当请求结束（包括请求成功和请求失败）时触发
            xhr.onloadend = function () {
                if (isDebug) console.warn('onloadend...');
                self.end();
            }

            // xhr.timeout不等于0，由请求开始即onloadstart开始算起，
            // 当到达xhr.timeout所设置时间请求还未结束即onloadend，则触发此事件。
            xhr.ontimeout = function () {
                if (isDebug) console.warn('request ontimeout...');
                this.ontimeout();
            }

            // 当调用xhr.abort()后触发
            xhr.onabort = function () {
                if (isDebug) console.warn('onabort...');
                this.onabort();
            }

            // 只有发生了网络层级别的异常(Network error)
            // 才会触发此事件
            xhr.onerror = function (e) {
                if (isDebug) console.warn('network error...');
                throw new Error('A network error occurred!');
            }

            // 当readyState改变时都会触发这个方法
            xhr.onreadystatechange = function() {
                switch (xhr.readyState) {
                    case 1:
                        // Opened
                        if (isDebug) console.warn('Opened (before xhr.send())...');
                        break;
                    case 2:
                        // Headers Received
                        if (isDebug) console.warn('Headers Received...');
                        break;
                    case 3:
                        // Loading
                        if (isDebug) console.warn('Loading (downloading response entity body)...');
                        break;
                    case 4:
                        // Done
                        if (isDebug) console.warn('Done...');
                        break;
                }
            }

            var data = '';
            if (this.dataType === DATA_TYPES[0]) {
                // json
                if (this.contentType === CONTENT_TYPES[3]) {
                    // formData
                    data = this.formData;
                } else {
                    // json
                    data = JSON.stringify(this.data);
                }
            }

            // console.log('before send: ', this, data);

            try {
                xhr.send(data);
            } catch (e) {
                if (isDebug) console.warn('send error...', e);
            }
        }

    }

    // Register as a named AMD module
    if (typeof define === 'function' && define.amd) {
        define('xhr', [], function() {
            return XHR;
        });
    }

    // Browser
    if (!noGlobal) {
        window.xhr = XHR;
    }

    var xhr = XHR;
    return xhr;
}));