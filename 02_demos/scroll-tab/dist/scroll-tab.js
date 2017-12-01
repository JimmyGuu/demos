;
(function(window, document, Hammer) {
    function ScrollTab(options) {
        if (this instanceof ScrollTab) {
            this.version = '1.0.0';
            this.author = 'Jehorn(gerardgu@outlook.com)';

            // 容器
            this.container = options.container || null;
            // Hammer.js 参数
            this.hammer = options.hammer || {};
            // 初始化位置
            this.init = options.init || 0;
            // item类名称
            this.itemClass = options.itemClass || 'tab-item';

            this.x = 0;
            this.move = 0;
            this.direction = 'left';
            this.counts = 0;
            this.oneWidth = 0;

            this.drag();
        } else {
            return new ScrollTab(options);
        }
    }

    // 阻止a标签可以在浏览器中被拖动
    function stopDrag(items) {
        if (items.length) {
            for (var len = items.length, i = len - 1; i >= 0; i--) {
                items[i].setAttribute('ondragstart', 'return false;');
            }
        } else {
            items.setAttribute('ondragstart', 'return false;');
        }
    }

    // 拖动
    ScrollTab.prototype.drag = function() {
        if (this.container == null) {
            console.warn('container 参数为必选参数!建议 container 不具有 padding 样式!');
            return;
        };
        if (!Hammer) {
            console.warn('请在此插件之前正确引用 Hammer.js!');
            return;
        }

        try {
            this.counts = this.container.querySelectorAll('.' + this.itemClass).length;
            this.oneWidth = this.container.clientWidth / this.counts;
        } catch (e) {
            console.warn('如果条目类名不是使用的默认值(tab-item),请指定 itemClass 参数!');
            console.error(e);
            return;
        }

        this.init < 0 ? this.init = 0 : this.init;

        var self = this,
            a = this.container.querySelector('.' + this.itemClass + ' a'),
            initPosi = this.init * this.oneWidth;

        initPosi > this.container.clientWidth - window.innerWidth ? initPosi = this.container.clientWidth - window.innerWidth : initPosi;

        // 清除a标签在浏览器默认事件
        stopDrag(a);

        var hammertime = new Hammer(this.container, this.hammer);

        // 初始化
        this.container.style.transform = 'translate3d(' + -initPosi + 'px, 0, 0)';
        this.container.style.transitionDuration = '0s';

        // 拖拽
        hammertime.on('panstart', function(e) {
            self.container.style.transitionDuration = '0s';

            var translate3d = self.container.style.transform.substring(self.container.style.transform.indexOf('(') + 1, self.container.style.transform
                .indexOf(')')).split(',');
            x = parseFloat(translate3d[0], 10);
        });
        hammertime.on('panend', function(e) {
            self.container.style.transitionDuration = '0.2s';
            self.autoPosition();
        });
        hammertime.on('panleft', function(e) {
            var left = x + e.deltaX;

            self.move = left;

            self.container.style.transform = 'translate3d(' + self.move + 'px, 0, 0)';
            self.direction = 'left';
        });
        hammertime.on('panright', function(e) {
            var right = x + e.deltaX;

            self.move = right;

            self.container.style.transform = 'translate3d(' + self.move + 'px, 0, 0)';
            self.direction = 'right';
        });
    }

    ScrollTab.prototype.autoPosition = function() {
        var m = this.move,
            overflow = this.container.clientWidth - window.innerWidth;
        m < 0 ? m = -m : m;

        if (this.direction === 'left') {
            if (m - this.oneWidth <= -this.oneWidth / 3 * 2) {
                // 从最左边拖拽的距离小于一格的三分之一
                // 回到原来的位置
                this.container.style.transform = 'translate3d(' + this.x + 'px, 0, 0)';
                return;
            }
            if (m - this.oneWidth <= 0) {
                console.log(2)
                    // 从最左边拖拽的距离大于一格的三分之一且小于一格
                    // 移动到下一格
                this.container.style.transform = 'translate3d(' + (this.x - this.oneWidth) + 'px, 0, 0)';
                return;
            }
            if (m > overflow) {
                // 超过右边
                // 自动回到末尾
                this.container.style.transform = 'translate3d(' + -overflow + 'px, 0, 0)';
                return;
            }
            if (m < 0) {
                // 超过左边
                // 自动回到起始
                this.container.style.transform = 'translate3d(' + 0 + 'px, 0, 0)';
                return;
            }

            if (m % this.oneWidth <= this.oneWidth / 3 * 1) {
                // 超过一格且小于一格的三分之一
                // 回到前一格
                this.container.style.transform = 'translate3d(' + -(Math.floor(m / this.oneWidth) * this.oneWidth) + 'px, 0, 0)';
                return;
            }
            if (m % this.oneWidth > this.oneWidth / 3 * 1) {
                // 超过一格且大于一格的三分之一
                // 到下一格
                var _m = Math.ceil(m / this.oneWidth) * this.oneWidth;
                _m > overflow ? _m = overflow : overflow;

                this.container.style.transform = 'translate3d(' + -_m + 'px, 0, 0)';
                return;
            }

            return;
        }

        if (this.direction === 'right') {
            if (this.move > 0) {
                // 超出最左边
                // 回到起始
                this.container.style.transform = 'translate3d(' + 0 + 'px, 0, 0)';
                return;
            }
            if (m % this.oneWidth <= this.oneWidth / 3 * 2) {
                // 取余小于一格的三分之二
                // 停在当前格

                var _m = Math.floor(m / this.oneWidth) * this.oneWidth;

                this.container.style.transform = 'translate3d(' + -_m + 'px, 0, 0)';
                return;
            }
            if (m % this.oneWidth > this.oneWidth / 3 * 2) {
                // 取余大于一格的三分之二
                // 至下一格

                var _m = Math.ceil(m / this.oneWidth) * this.oneWidth;

                this.container.style.transform = 'translate3d(' + -_m + 'px, 0, 0)';
                return;
            }

            return;
        }
    }

    window.ScrollTab = ScrollTab;

})(window, document, Hammer);
