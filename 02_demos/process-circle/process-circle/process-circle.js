; (function (window, document) {
    var ProcessCircle = function (json) {
        if (this instanceof processCircle) {
            this.author = 'Jehorn';
            this.version = '0.0.1';

            // 进度条的宽/高
            this.size = json.size || 100;
            // 边框的宽度
            this.borderSize = json.borderSize || 3;
            // 显示文字的大小
            this.textSize = json.textSize || 24;
            // 宽高以及边框的单位 px, em, rem
            this.unit = json.unit || 'px';
            // 显示的百分比值
            this.num = json.num || 0;
            // 动画速度 毫秒
            this.speed = json.speed || 10;

            // 容器的 id
            this.id = json.id || 'processCircle';
            // 是否显示调试信息
            this.debug = json.debug || false;
            // 是否显示中间的百分比信息
            this.isText = json.isText || true;
            // 百分比信息颜色
            this.textColor = json.textColor || '#ff5f00';
            // 边框颜色
            this.borderColor = json.borderColor || '#ff5f00';
            // 边框背景色
            this.borderBgColor = json.borderBgColor || '#dddddd';
            // 边框样式
            this.borderType = json.borderType || 'solid';
            // 是否需要实例化完毕自动渲染
            // 如果为 false, 需要在实例化完毕后调用 init 方法
            this.isInit = json.isInit || false;

            if (this.isInit) {
                this.init();
            }

        } else {
            return new processCircle(json);
        }
    }

    // 控制台打印信息
    var debug = function (_this, json) {
        this.info = json.info || '';
        this.type = json.type || 'log';

        if (_this.debug) {
            console.log('%c Debug message from ProcessCircle: ', 'background: #ff5f00;color: #fff;font-size: 12px;');

            var consoleTypes = ['log', 'write', 'warn', 'warning', 'error'];
            var infoPrint = function (consoles) {
                try {
                    if (typeof (this.info) === 'string') {
                        consoles(this.info);
                        return;
                    }
                    if (this.info instanceof Array || typeof (this.info) === 'object') {
                        for (var i in this.info) {
                            if (typeof (this.info[i] === 'object')) {
                                for (var j in this.info[i]) {
                                    consoles(j + ': ' + this.info[i][j]);
                                }
                            } else {
                                consoles(i + ': ' + this.info[i]);
                            }
                        }
                        return;
                    }
                } catch (e) {
                    console.error(e);
                    return;
                }
            }

            if (this.type) {
                this.type = this.type.toString().toLowerCase();

                switch (this.type) {
                    case 'log':
                        infoPrint(console.log);
                        break;
                    case 'write':
                        infoPrint(console.log);
                        break;
                    case 'warn':
                        infoPrint(console.warn);
                        break;
                    case 'warning':
                        infoPrint(console.warn);
                        break;
                    case 'error':
                        infoPrint(console.error);
                        break;
                    default:
                        infoPrint(console.log);
                        break;
                }
            }
        }
    }

    // 传入值验证合法性
    // 自动转换
    var checkParam = function (_this) {
        var errors = [];

        var float = /^(-?\d+)(\.\d+)?$/;
        var floatPlus = /^\d+(\.\d+)?$/;
        var color = /^#[0-9a-fA-F]{3,6}$/;
        var units = ['px', 'em', 'rem'];
        var borderStyle = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'];

        if (!floatPlus.test(_this.size)) {
            var error = { param: 'size', msg: '请设置为非负数字' };
            errors.push(error);
        }
        if (!floatPlus.test(_this.borderSize)) {
            var error = { param: 'borderSize', msg: '请设置为非负数字' };
            errors.push(error);
        }
        if (!floatPlus.test(_this.textSize)) {
            var error = { param: 'textSize', msg: '请设置为非负数字' };
            errors.push(error);
        }
        if (units.indexOf(_this.unit) < 0) {
            var error = { param: 'unit', msg: '属性包括[\'px\', \'em\', \'rem\']' };
            errors.push(error);
        }
        if (_this.num.toString().indexOf('%') > -1) {
            var num = _this.num.toString().substring(0, _this.num.toString().indexOf('%'));
            _this.num = num;
            debug(_this, { info: 'num: Get value before the \'%\': ', type: 'log' });
        }
        if (!floatPlus.test(_this.num)) {
            var error = { param: 'num', msg: '请设置为非负数字' };
            errors.push(error);
        }
        if (!float.test(_this.speed)) {
            var error = { param: 'speed', msg: '属性请设置为数字' };
            errors.push(error);
        }
        if (!color.test(_this.textColor)) {
            var error = { param: 'textColor', msg: '请正确设置\'textColor\'属性的16进制颜色值' };
            errors.push(error);
        }
        if (!color.test(_this.borderColor)) {
            var error = { param: 'borderColor', msg: '请正确设置\'borderColor\'属性的16进制颜色值' };
            errors.push(error);
        }
        if (!color.test(_this.borderBgColor)) {
            var error = { param: 'borderBgColor', msg: '请正确设置\'borderBgColor\'属性的16进制颜色值' };
            errors.push(error);
        }
        if (borderStyle.indexOf(_this.borderType) < 0) {
            var error = { param: 'borderStyle', msg: '请正确设置\'borderStyle\'属性的属性值, 具体属性请参考 http://www.w3school.com.cn/cssref/pr_border-style.asp' };
            errors.push(error);
        }

        if (errors.length > 0) {
            debug(_this, {
                info: errors,
                type: 'error'
            });
            return false;
        }

        return true;
    }

    // 创建DOM
    var create = function (_this) {
        var container = document.getElementById(_this.id);

        if (!container) {
            var error = { msg: '未选取到容器, 请传入正确的 id 字符串或者不传值使用默认 id: "processCircle".', type: 'error' }
            debug(_this, {
                info: error.msg,
                type: error.type
            });
            return false;
        }

        container.className = 'circle-process';
        container.style.width = _this.size + _this.unit;
        container.style.height = _this.size + _this.unit;

        var html = '<div class="wrapper circle-right">\
          <div class="circle" id="circleRight"></div>\
        </div>\
        <div class="wrapper circle-left">\
          <div class="circle" id="circleLeft"></div>\
        </div>\
        <div class="percent" id="percentProcess">0%</div>';

        container.innerHTML = html;
        return true;
    }

    // 设置样式
    var setStyle = function (_this) {
        var wrapperSize = parseFloat(_this.size) / 2;
        var circleSize = parseFloat(_this.size) - parseFloat(_this.borderSize) * 2;
        var borderSize = parseFloat(_this.borderSize);
        var wrappers = document.getElementById(_this.id).getElementsByClassName('wrapper');
        var circles = document.getElementById(_this.id).getElementsByClassName('circle');
        var circleRight = document.getElementById('circleRight');
        var circleLeft = document.getElementById('circleLeft');
        var percentBox = document.getElementById('percentProcess');
        var bgBorder = _this.borderSize + _this.unit + ' ' + _this.borderType + ' ' + _this.borderBgColor;

        for (var i = 0; i < wrappers.length; i++) {
            wrappers[i].style.width = wrapperSize + _this.unit;
            wrappers[i].style.height = _this.size + _this.unit;
            circles[i].style.width = circleSize + _this.unit;
            circles[i].style.height = circleSize + _this.unit;
            circles[i].style.border = bgBorder;
        }

        circleRight.style.borderTopColor = _this.borderColor;
        circleRight.style.borderRightColor = _this.borderColor;
        circleLeft.style.borderBottomColor = _this.borderColor;
        circleLeft.style.borderLeftColor = _this.borderColor;

        percentBox.style.fontSize = _this.textSize + _this.unit;
        percentBox.style.color = _this.textColor;
        percentBox.style.lineHeight = _this.size + _this.unit;
    }

    // 设置百分比
    var setPercent = function (_this) {
        var percentBox = document.getElementById('percentProcess');
        var rightcircle = document.getElementById('circleRight');
        var leftcircle = document.getElementById('circleLeft');
        var num = parseFloat(_this.num);
        var i = 0;

        var clock = window.setInterval(function () {
            i++;
            if (i > num) {
                i = num;
                window.clearInterval(clock);
            }
            percentBox.innerHTML = i + '%';

            if (i <= 50) {
                rightcircle.style.transform = 'rotate(' + (-135 + 3.6 * i) + 'deg)';
                leftcircle.style.transform = 'rotate(-135deg)';
            } else {
                rightcircle.style.transform = 'rotate(45deg)';
                leftcircle.style.transform = 'rotate(' + (-135 + 3.6 * (i - 50)) + 'deg)';
            }

        }, _this.speed);
    }

    // 初始化
    ProcessCircle.prototype.init = function () {
        var percent = this.num + '%';

        var check = checkParam(this);

        if (!check) {
            return;
        }

        var created = create(this);
        if (created) {
            setStyle(this);
            setPercent(this);
        }
    }

    // TODO: 动态引入样式表文件 - 暂有问题, 需要判断css加载完成
    ProcessCircle.prototype.linkStyleSheet = function (url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    window.processCircle = ProcessCircle;
}) (window, document)
