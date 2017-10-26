/**
 * Carousel Pro
 */
; (function (window, document) {
	// 初始化参数
	// @param  {Object} options 轮播参数
	// @return {Object}         初始化操作后的轮播参数
	var Init = function (options) {
		var obj = {};

		// 原始图片路径数组
		obj.datas     = options.datas;
		// 渲染超过个数 默认为 1 表示首尾各多添加一个 最小为 1 最大为 obj.datas.length
		obj.overCount = parseInt(options.overCount) || 1;
		obj.overCount < 1 ? obj.overCount = 1 : obj.overCount;
		obj.overCount > obj.datas.length ? obj.overCount = obj.datas.length : obj.overCount;
		// 渲染数组
		obj.renderDatas = [];
		for (var data in obj.datas) {
			obj.renderDatas.push(obj.datas[data]);
		}
		for(var c = 0; c < obj.overCount; c++) {
			var prev        = obj.datas[obj.datas.length - (1 + c)];
			var next        = obj.datas[0 + c];

			obj.renderDatas.unshift(prev);
			obj.renderDatas.push(next);
		}

		// 创建文字轮播 将会创建指定宽高背景色内容的轮播
		// 设置此项将会使轮播以字符串显示 datas 数组中的内容
		// 必须设置为布尔值 ture 起效
		obj.isText      = options.isText === true ? true : false;
		// 如果显示文字轮播
		// 指定文字轮播样式 {Object}
		obj.textStyle   = options.textStyle ? options.textStyle = {
			color: options.textStyle.color || '#000',
			fontSize: options.textStyle.fontSize || '14px',
			textAlign: options.textStyle.textAlign || 'center',
			lineHeight: options.textStyle.lineHeight || '30px',
			textDecoration: options.textStyle.textDecoration || 'none'
		} : {
			color: '#000',
			fontSize: '14px',
			textAlign: 'center',
			lineHeight: '30px',
			textDecoration: 'none'
		}
		obj.text        = options.text || 'carousel';
		// 轮播元素背景 {String}
		// string 时所有轮播元素为一种背景
		// 如果想要不同背景 请在 datas 属性添加 background
		obj.background  = options.background || '#efefef';

		// 初始化显示图片
		obj.current     = options.index === undefined ? 0 : parseInt(options.index);
		obj.current < 0 ? obj.current = 0 : '';
		obj.current > obj.datas.length - 1 ? obj.current = obj.datas.length - 1 : '';
		// 分页容器id
		obj.isPager     = options.pager;
		// 分页是否具有控制功能
		obj.pagerCtrl   = options.pagerCtrl === undefined ? true : options.pagerCtrl;
		// 分页配置属性
		obj.pagerCon    = options.pagerCon ? options.pagerCon = {
			active: options.pagerCon.active || '#ff5f00',
			event: options.pagerCon.event || 'click',
			delay: options.pagerCon.delay || 600
		} : {
			active: '#ff5f00',
			event: 'click',
			delay: 600
		}
		// 分页样式
		obj.pagerStyle  = options.pagerStyle ? options.pagerStyle = {
			display: options.pagerStyle.display || 'inline-block',
			background: options.pagerStyle.background || '#efefef',
			width: options.pagerStyle.width || '30px',
			height: options.pagerStyle.height || '30px',
			borderRadius: options.pagerStyle.borderRadius || '50%',
			margin: options.pagerStyle.margin || '10px 4px',
			cursor: options.pagerStyle.cursor || 'pointer'
		} : {
			display: 'inline-block',
			background: '#efefef',
			width: '30px',
			height: '30px',
			borderRadius: '50%',
			margin: '10px 4px',
			cursor: 'pointer'
		}
		// 是否自动播放
		obj.isAuto      = options.auto === undefined ? true : options.auto;
		// 是否鼠标悬浮轮播上时停止播放
		obj.hoverStop   = options.hoverStop === undefined ? true : options.hoverStop;
		// 播放速度(每张图片停留时间) 最小值为 1
		obj.speed       = options.speed || 1200;
		obj.speed < 1 ? obj.speed = 1 : obj.speed;
		// 过度效果速度(图片切换动画速度)
		obj.animate     = options.animate || 600;
		obj.animate < 1 ? obj.animate = 1 : obj.animate;
		// 过渡效果类型(slide|fade)
		obj.animateType = options.animateType || 'slide';
		// 图片轮播方向自(left|right)
		obj.direction   = options.direction || 'right';
		// 轮播高度
		obj.height      = options.height || 300;
		// 图片高度 请自行指定单位
		obj.imgHeight   = options.imgHeight || '100%';
		// 图片宽度 请自行指定单位
		obj.imgWidth    = options.imgWidth || '100%';
		// 轮播容器外边距
		obj.margin      = options.margin || 0;
		// 轮播容器内边距
		obj.padding     = options.padding || 0;
		// 轮播按钮向前id
		obj.prev        = options.prev;
		// 轮播按钮向后id
		obj.next        = options.next;
		// 轮播初始化显示延时
		obj.delay       = options.delay || 300;
		// 轮播容器DOM
		obj.container   = options.container;
		// 如果输对象数组 请指定图片路径属性名称 default: src
		obj.imgName     = options.imgName || 'src';
		// 如果输对象数组 请指定图片链接属性名称 default: href
		obj.hrefName    = options.hrefName || 'href';
		// 如果输对象数组 且需要不同背景 请指定背景属性名称 default: background
		obj.backgroundName      = options.backgroundName || 'background';
		// 滑动效果动画曲线
		obj.slideTimingFunction = options.slideTimingFunction || 'ease';
		// 轮播元素类名称
		obj.itemClassName       = options.itemClassName || 'carousel-item';
		// 轮播元素(用于清空)
		obj.items               = obj.container.getElementsByClassName(obj.itemClassName);


		return obj;
	}

	// 错误处理
	// @param  {string} state    错误状态
	// @param  {string} msg      错误信息
	// @param  {array}  errorArr 外部错误对象数组
	// @return {object} obj { state: [state], msg: [msg] }
	var error = function (state, msg, errorArr) {
		state    = state || 'error';
		msg      = msg || '错误!';
		errorArr = errorArr || [];
		var obj  = { state: state, msg: msg };
		errorArr.push(obj);
		return obj;
	}

	// 验证浏览器对 transition 的兼容
	var transitionEvent = function () {
       	var el = document.createElement('surface'),
       	transitions = {
         	'transition':'transitionend',
         	'OTransition':'oTransitionEnd',
         	'MozTransition':'transitionend',
         	'WebkitTransition':'webkitTransitionEnd'
       	}

       	for(var t in transitions){
          	if( el.style[t] !== undefined ){
               	return transitions[t];
           	}
       	}
   	}

	// 清除轮播容器内多余的元素
	// @param {object} container 轮播容器
	// @param {array}  items     多余轮播元素 .itemClassName
	// @return 					 void
	var clear = function (container, items) {
		for (var i = items.length - 1; i >= 0; i--) {
			container.removeChild(items[i]);
		}
	}

	// 动画效果 基类
	var Animation = function (self, index) {
		var crt          = self.watchObj.current;
		var datas        = self.datas;
		var direction    = self.opts.direction;
		this.box         = self.container;
		this.speed       = self.opts.animate;
		this.realLeftLen = self._initLeft - self._multiple * (index);
		this.leftLen     = this.realLeftLen;
		this.items       = self.container.childNodes;
		index            = parseInt(index);

		if (datas.length >= 3) {
			if (crt === 0 && index === datas.length - 1) {
				// 当前为第一个 将要切换的为最后一个
				// 即为从第一个向最后一个切换
				this.leftLen = self.left + self._multiple;
			} else if (crt === datas.length - 1 && index === 0) {
				// 即为从最后一个向第一个切换
				this.leftLen = self.left - self._multiple;
			}
		} else if (datas.length === 2) {
			if (direction === 'right' && crt === 1 && index === 0) {
				this.leftLen = self.left - self._multiple;
			} else if (direction === 'left' && crt === 0 && index === 1) {
				this.leftLen = self.left + self._multiple;
			}
		} else if (datas.length === 1) {
			if (direction === 'right') {
				this.leftLen = self.left - self._multiple;
			} else if (direction === 'left') {
				this.leftLen = self.left + self._multiple;
			}
		}
	}

	// 滑动效果
	// @param  {Object} self  轮播类 this 指针
	// @param  {Number} index 将要改变到的下标(相对于原始数组而言)
	// @return {void}
	var SlideAnimate = function (self, index) {
		Animation.call(this, self, index);

		var _this = this;

		this.box.style.transitionDuration       = this.speed + 'ms';
		this.box.style.transitionTimingFunction = self.opts.slideTimingFunction;
		this.box.style.transform                = 'translate3d(' + this.leftLen + '%, 0, 0)';

		// 监听动画事件完成
		var transition = transitionEvent();
		transition && this.box.addEventListener(transition, function() {
			// 销毁事件
			_this.box.removeEventListener(transition, arguments.callee, false);
			_this.box.style.transitionDuration = '0ms';
			_this.box.style.transform          = 'translate3d(' + _this.realLeftLen + '%, 0, 0)';
			self.left                          = _this.realLeftLen;
			self.watchObj.current              = index;
			for (var i = 0; i < _this.items.length; i++) {
				_this.items[i].className = self.opts.itemClassName;
			}
			_this.items[self.opts.overCount + index].className = self.opts.itemClassName + ' ' + self.opts.itemClassName + '-active';
	   	});
	}

	// 淡入淡出效果
	// @param  {Object} self  轮播类 this 指针
	// @param  {Number} index 将要改变到的下标(相对于原始数组而言)
	// @return {void}
	var FadeAnimate = function (self, index) {
		Animation.call(this, self, index);

		var _this = this;
		var speed = this.speed / 3;

		this.box.style.transition = 'opacity ' + (speed * 1 + 'ms ') + 'ease-out';
		this.box.style.opacity = 0.1;

		// 监听动画事件完成
		var transition = transitionEvent();
		transition && this.box.addEventListener(transition, function() {
			// 销毁事件
			_this.box.removeEventListener('animationend', arguments.callee, false);
			_this.box.style.transition = 'opacity ' + (speed * 2 + 'ms ') + 'ease-in';
			_this.box.style.transform = 'translate3d(' + _this.realLeftLen + '%, 0, 0)';

			_this.box.style.opacity = 1;

			self.left             = _this.realLeftLen;
			self.watchObj.current = index;
			for (var i = 0; i < _this.items.length; i++) {
				_this.items[i].className = self.opts.itemClassName;
			}
			_this.items[self.opts.overCount + index].className = self.opts.itemClassName + ' ' + self.opts.itemClassName + '-active';
		});
	}

	// 轮播容器处理
	// @param {object} container 轮播容器
	// @param {object} opt       轮播容器设置参数
	// @return                   void
	var setContainer = function (container, opt) {
		opt = opt || {};

		clear(container, opt.items);

		var getValue = function (value) {
			var val;
			typeof value === 'number' ? val = value + 'px' : val = value;
			return val;
		}

		container.style.height     = getValue(opt.height);
		container.style.margin     = getValue(opt.margin);
		container.style.padding    = getValue(opt.padding);
		container.style.clear      = 'both';
		container.style.overflow   = 'hidden';
		container.style.listStyle  = 'none';
		container.style.visibility = 'hidden';
		container.style.opacity    = '0';
		container.className        = 'carousel';
	}

	// 创建轮播元素
	// @param  {object} self  调用方的this
	// @param  {object} opt   轮播元素参数
	// @param  {Number} index 循环下标 下标+overCount为当前位置
	// @return {object} item  轮播元素
	var createItem = function (self, opt, index) {
		var isText    = self.opts.isText;
		var textStyle = self.opts.textStyle;
		var classname = self.opts.itemClassName;
		var current   = self.watchObj.current;
		var overCount = self.opts.overCount;
		var href      = opt.href || 'javascript: void(0);';
		var bg        = opt.background || self.opts.background;
		var item      = document.createElement('a');
		var img       = document.createElement('img');
		var width     = 100 / self.renderDatas.length + '%';

		item.className        = classname;
		current === (index - overCount) ? item.className = classname + ' ' + classname + '-active' : '';
		item.style.width      = width;
		item.style.background = bg;
		item.href             = href;
		item.style.display    = 'block';
		item.style.float      = 'left';
		item.style.height     = '100%';
		item.style.border     = '0';

		img.style.width  = self.opts.imgWidth;
		img.style.height = self.opts.imgHeight;
		if (isText === true) {
			// 如果是显示文字 此时src即为文字内容
			img           = document.createElement('div');
			img.innerHTML = opt.src;
			for(var style in textStyle) {
				item.style[style] = textStyle[style];
			}
		} else {
			// 显示图片
			img.src = opt.src;
			try {
				img.alt = opt.alt || opt.src.split('/')[opt.src.split('/').length - 1];
			} catch (e) {
				console.warn(e);
			}
		}

		item.appendChild(img);

		return item;
	}

	// 渲染元素
	// @param  {object} self 调用方的this
	// @return {void}
	var render = function (self) {
		var renderDatas = self.renderDatas;

		clear(self.container, self.container.childNodes);
		for (var i = 0; i < renderDatas.length; i++) {
			var node, opt = {};
			if (typeof renderDatas[i] === 'string') {
				opt.src = renderDatas[i];
				node    = createItem(self, opt, i);
			} else if (typeof renderDatas[i] === 'object' && !renderDatas[i].length) {
				opt.src        = renderDatas[i][self.opts.imgName];
				opt.href       = renderDatas[i][self.opts.hrefName];
				opt.background = renderDatas[i][self.opts.backgroundName];
				node = createItem(self, opt, i);
			}

			self.container.appendChild(node);
		}
	}

	// 判断下标是否超出范围
	var currentRange = function (crt, len) {
		var current = parseInt(crt);
		var length = parseInt(len);

		current < 0 ? current = length - 1 : current;
		current > length - 1 ? current = 0 : current;

		return current;
	}

	// 上一个
	var prev = function (self) {
		var index     = self.watchObj.current - 1;
		var direction = self.opts.direction;

		if (direction === 'left') index = self.watchObj.current + 1;
		index         = currentRange(index, self.datas.length);

		if (self.opts.animateType === 'slide') SlideAnimate(self, index);
		if (self.opts.animateType === 'fade') FadeAnimate(self, index);
	}

	// 下一个
	var next = function (self) {
		var index     = self.watchObj.current + 1;
		var direction = self.opts.direction;

		if (direction === 'left') index = self.watchObj.current - 1;
		index         = currentRange(index, self.datas.length);

		if (self.opts.animateType === 'slide') SlideAnimate(self, index);
		if (self.opts.animateType === 'fade') FadeAnimate(self, index);
	}

	// 自动播放
	var autoPlay = function (self) {
		// 防止创建多个 计时器
		if (!self.isAutoPlaying) {
			var p = setInterval(function () {
				next(self);
			}, self.opts.speed + self.opts.animate);
			self.player = p;

			self.isAutoPlaying = true;
			self.isAutoPlayStop = false;
		}
	}

	// 停止播放
	var stopPlay = function (self, setStopState) {
		clearInterval(self.player);
		self.isAutoPlaying = false;
		!setStopState ? self.isAutoPlayStop = true : '';
	}

	// 重置计时器
	var changeResetPlay = function (self) {
		stopPlay(self, true);
		var timer = setTimeout(function () {
			clearTimeout(timer);
			// 允许自动播放而且当前不是在停止状态
			if (!self.isAutoPlayStop) autoPlay(self);
		}, 300);
	}

	// 创建轮播分页
	// @param  {object} pagerContainer 分页容器
	// @param  {object} self           调用方的this
	// @return {void}
	var createPager = function (pagerContainer, self) {
		if (!pagerContainer) {
			var error = error('error', 'pager参数错误!未能选择到分页的容器。', self.errors);
			return;
		}

		var left        = self.left;
		var container   = self.container;
		var current     = self.watchObj.current;
		var animate     = self.opts.animate;
		var animateType = self.opts.animateType;
		var arr         = self.datas;
		var pagerCtrl   = self.opts.pagerCtrl;
		var active      = self.opts.pagerCon.active;
		var pagerEvent  = self.opts.pagerCon.event;
		var pagerDelay  = self.opts.pagerCon.delay;
		var pagerStyle  = self.opts.pagerStyle;

		// 分页点击事件
		var change = function (current, e) {
			var id;
			if (!span.dataset) id = e.target.title;
			else id = e.target.dataset.id;
			var index = parseInt(id);

			// 重置计数器
			changeResetPlay(self);

			var pagerSiblings = e.target.parentNode.childNodes;
			for (var i = 0; i < pagerSiblings.length; i++) {
				pagerSiblings[i].style.background = pagerStyle.background;
			}
			e.target.style.background = self.opts.pagerCon.active;

			if (animateType === 'slide') SlideAnimate(self, index);
			if (animateType === 'fade') FadeAnimate(self, index);
		}

		// 循环原始数组 一图对应一分页
		for (var i = 0; i < arr.length; i++) {
			var span = document.createElement('span');

			// 分页样式
			// pagerStyle
			for (var style in pagerStyle) {
				span.style[style] = pagerStyle[style];
			}
			span.className = 'carousel-pager';

			// data- 兼容性
			if (!span.dataset) span.title = i;
			else span.dataset.id          = i;

			// 初始化样式
			current === i ? span.style.backgroundColor = active : '';

			// 绑定分页控制事件
			var timer;
			if (pagerCtrl) span.addEventListener(pagerEvent, function (e) {
				change(current, e);
			});

			// 将分页元素添加到分页容器
			pagerContainer.appendChild(span);
		}
	}

	// 设置分页样式
	var setPager = function (pagerContainer, self) {
		if (!pagerContainer) {
			var error = error('error', 'pager参数错误!未能选择到分页的容器。', self.errorArr);
			return;
		}

		var active     = self.opts.pagerCon.active;
		var normal     = self.opts.pagerStyle.background;
		var itemsPager = pagerContainer.childNodes;

		for (var i = 0;i < itemsPager.length; i++) {
			itemsPager[i].style.backgroundColor = normal;
			if (self.watchObj.current === i) {
				itemsPager[i].style.backgroundColor = active;
			}
		}
	}

	// 鼠标悬浮停止计时器
	var hoverStopPlay = function (self) {
		// 不能调用 stopPlay(self) 方法, 否则会立即执行
		var stop = function () {
			clearInterval(self.player);
			self.isAutoPlaying = false;
		}
		self.container.addEventListener('mouseover', stop);
		self.container.addEventListener('mouseleave', function () {
			// 允许自动播放而且当前不是在停止状态
			if (!self.isAutoPlayStop) {
				autoPlay(self);
			}
		});
	}

	// 暴露公共方法 按钮
	var publicBtnEvent = function (b, fn, fialMsg) {
		if (!b) return;
		fn  = fn || function () { };
		msg = fialMsg || '获取按钮失败!请正确指定按钮的id或者classname!';
		var btn, _this = this;
		var error = function () {
			console.warn(msg);
			return;
		}


		btn = document.getElementById(b) || document.getElementsByClassName(b)[0];
		btn ?
		btn.addEventListener('click', function () {
			fn();
		}) :
		error();
	}

	// 横向轮播类
	// @param  {Object} options 轮播参数
	// @return {void}           null
	var Horizontal = function (options) {
		// 所有参数
		this.opts             = Init(options);
		// 轮播容器
		this.container        = this.opts.container;
		// 原始轮播数组
		this.datas            = this.opts.datas;
		// 初始化渲染数组 首插入最后一个元素 尾插入第一个元素
		this.renderDatas      = this.opts.renderDatas;
		// 错误数组
		this.errors           = [];
		// 监听对象
		this.watchObj         = { _current: 0 };
		// 倍数 即 100 、 渲染数组的长度
		this._multiple        = 100  / this.renderDatas.length;
		// 是否正在播放
		this.isAutoPlaying    = false;
		// 自动播放停止状态
		this.isAutoPlayStop   = true;
		// 自动播放计时器
		this.player           = null;

		// 赋值指定初始化current
		this.watchObj.current = this.opts.current;
		// 初始化偏移 不可从外部更改
		this._initLeft        = -this._multiple * this.opts.overCount * (this.opts.current + 1);
		// 计算偏移量
		this.left             = this._initLeft;

		var self              = this;
		// container 参数
		var boxOpt            = {};

		boxOpt.height         = this.opts.height;
		boxOpt.margin         = this.opts.margin;
		boxOpt.padding        = this.opts.padding;
		boxOpt.items          = this.opts.items;

		// 处理轮播容器
		setContainer(this.container, boxOpt);

		// 初始化轮播容器
		// 初始化总宽度
		this.container.style.width     = this.renderDatas.length * 100 + '%';
		// 初始化偏移量
		//this.container.style.marginLeft = this.left + '%';
		this.container.style.transform = 'translate3d(' + this.left + '%, 0, 0)';

		// 创建元素
		render(this);

		// 初始化延时显示所有轮播
		var timer = setTimeout(function () {
			self.container.style.transition = 'opacity ' + self.opts.delay + 'ms ease-in';
			self.container.style.visibility = 'visible';
			self.container.style.opacity    = '1';
			clearTimeout(timer);
		}, 0);
		var clearTimer = setTimeout(function () { self.container.style.transition = '';clearTimeout(clearTimer); }, this.opts.delay);

		// 创建分页
		var pagerContainer;
		if (this.opts.isPager) {
			pagerContainer = document.getElementById(this.opts.isPager) || document.getElementsByClassName(this.opts.isPager)[0];
			createPager(pagerContainer ,this);
		}

		// 绑定上下按钮
		this.prev(this.opts.prev);
		this.next(this.opts.next);

		// 自动播放
		if (this.opts.isAuto) {
			autoPlay(this);
		}

		// 鼠标悬浮停止
		if (this.opts.hoverStop) {
			hoverStopPlay(this);
		}

		// 监听 current index 的变化
		Object.defineProperty(this.watchObj, "current", {
		    get: function() {
		        return this._current;
		    },
		    set: function(value) {
		        if (value !== this._current) {
		            this._current = value;
		            // 设置分页样式
		            if (pagerContainer) {
						setPager(pagerContainer, self);
					}
		        }
		    }
		});
	}

	Horizontal.prototype.next = function (btn) {
		var self    = this;
		var success = function () {
			// 重置计数器
			changeResetPlay(self);
			next(self);
		}
		publicBtnEvent(btn, success);
	}

	Horizontal.prototype.prev = function (btn) {
		var self    = this;
		var success = function () {
			// 重置计数器
			changeResetPlay(self);
			prev(self);
		}
		publicBtnEvent(btn, success);
	}

	Horizontal.prototype.play = function (btn) {
		var self    = this;
		var success = function () {
			autoPlay(self);
		}
		publicBtnEvent(btn, success);
	}

	Horizontal.prototype.stop = function (btn) {
		var self    = this;
		var success = function () {
			stopPlay(self);
		}
		publicBtnEvent(btn, success);
	}

	// 纵向轮播类
	// @param  {Object} options 轮播参数
	// @return {void}           null
	var Vertical = function (options) {
		console.log(opts);
		console.warn('%c Sorry, Vertical is Under development...', 'font-size: 20px;color: #ff5f00;');
	}

	// 工厂
	// @param  {String} type    轮播类型
	// @param  {Object} options 轮播参数
	// @return {Object}         指定轮播的一个实例对象
	var Factory = function (type, options) {
		var carousel = null;
		switch (type) {
			case 'h':
				carousel = new Horizontal(options);
				break;
			case 'v':
				carousel = new Vertical(options);
				break;
		}

		return carousel;
	}

	// 公共暴露对象
	var Carousel = {
		/**
		 * 初始化一个轮播
		 * @param  {String} target  轮播容器
		 * @param  {String} type    轮播类型
		 * @param  {Object} options 轮播参数
		 * @return {Object}         指定轮播的一个实例对象
		 */
		on: function (target, type, options) {
			this.errors = [];
			options       = options || {};

			if (!target) {
				var err = error('error', '请输入有效的容器id!', this.errors);
				console.error(err);
				return this;
			}

			// 获取容器
			var container = document.getElementById(target);
			if (!container)  {
				var err = error('error', '未能选择到轮播容器!请确定输入有效的id!', this.errors);
				console.error(err);
				return this;
			}

			// 验证数组是否合法
			var dataArr = options.datas || [];
			if (typeof dataArr !== 'object' || !dataArr.length || dataArr.length <= 0) {
				var err = error('error', 'datas参数无效或错误!请确定datas值为长度大于0的数组!', this.errors);
				console.error(err);
				return this;
			}

			// 轮播类型验证不合法操作方法
			var typeInvalid = function (self) {
				var err = error('error', 'type参数可能无效!未能找到指定类型!', self.errors);
				console.error(err);
				return self;
			}

			// 将值赋到参数对象中
			options.container = container;

			// 进入工厂模式请求指定的轮播
			var carousel = Factory(type, options);
			carousel ? carousel : carousel = typeInvalid(this);
			return carousel;
		},
		/**
		 * 解绑一个/多个轮播
		 * @param  {Object|Array} carousel 轮播实例对象|对象数组
		 * @return {String}                返回解绑结果字符串
		 */
		off: function (carousel) {
			console.log('解绑轮播')
		}
	}

	window.Carousel = Carousel;

}) (window, document);