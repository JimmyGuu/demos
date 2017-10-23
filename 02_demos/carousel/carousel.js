;(function (window, document) {
	// 私有通用属性
	// 初始化参数
	var Init = function (options) {
		var obj = {};

		// 原始图片路径数组
		obj.dataArr     = options.datas;
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
		// 播放速度(每张图片停留时间)
		obj.speed       = options.speed || 1200;
		// 过度效果速度(图片切换动画速度)
		obj.animate     = options.animate || 600;
		// 过渡效果类型(slide|fade)
		obj.animateType = options.animateType || 'slide';
		// 图片轮播方向自(left|right)
		obj.direction   = options.direction || 'right';
		// 轮播高度
		obj.height      = options.height || 400;
		// 图片高度 请自行指定单位
		obj.imgHeight   = options.imgHeight || 'auto';
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
		obj.delay       = options.delay || 30;
		// 轮播容器DOM
		obj.container   = options.container;
		// 轮播元素(用于清空)
		obj.items       = options.items;
		// 如果输对象数组 请指定图片路径属性名称 default: src
		obj.imgName     = options.imgName || 'src';
		// 如果输对象数组 请指定图片链接属性名称 default: href
		obj.hrefName    = options.hrefName || 'href';
		// 如果输对象数组 且需要不同背景 请指定背景属性名称 default: background
		obj.backgroundName = options.backgroundName || 'background';


		return obj;
	}

	// 验证current是否超出了显示
	// @param {object} self
	// @param {number} change 改变量
	var currentRange = function (self, change) {
		var crt   = 0,
			afterCrt = self.defineObj.current + change,
			len = self.renderArr.length;
		var range = function (_crt, _len, isLess) {
			var i = _crt;

			if (isLess === 'one') {
				if (_crt > _len - 3) i = 0;
				if (_crt < 0) i = _len - 3;
			} else if (isLess === 'two') {
				if (_crt > _len - 2) i = 0;
				if (_crt < 0) i = _len - 2;
			} else {
				if (_crt > _len - 1) i = 0;
				if (_crt < 0) i = _len - 1;
			}

			return i;
		}

		if (self.length === 1) {
			crt = range(afterCrt, len, 'one');
		} else if (self.length === 2) {
			crt = range(afterCrt, len, 'two');
		} else {
			crt = range(afterCrt, len);
		}

		return crt;
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

	// 左右滑动过渡效果 TODO: top2bot
	// @param {string} direction 切换方向 [plus|reduce]
	// @param {object} self 调用者实例 this
	// @param {object} opt {
	// 		container: [object | 轮播容器]
	//  	left: [number | 初始容器偏移量],
	//  	multiple: [number | 将要偏移的100的倍数],
	//  	currentChange: [number | 显示图片下标改变量],
	//  	animate: [number | 过度效果时间(ms)]
	//  }
	var SlideLRAnimate = function (direction, self, opt) {
		self.rendering  = true;

		var leftLen       = opt.left;
		var type          = direction || 'plus';
		var multiple      = parseInt(opt.multiple) || 1;
		var currentChange = parseInt(opt.currentChange) || 1;
		var speed         = opt.animate || 800;
		var box           = opt.container;

		if (type === 'plus') leftLen -= (100 * multiple);
		if (type === 'reduce') leftLen += (100 * multiple);

		box.style.transition = 'margin-left ' + (parseFloat(speed) / 1000) + 's ease';
		box.style.marginLeft = leftLen + '%';

		// 通过监听动画事件完成
		var transition = transitionEvent();
		transition && box.addEventListener(transition, function() {
			// 销毁事件
			box.removeEventListener(transition, arguments.callee, false);
	    	box.style.transition = 'none';
			box.style.marginLeft = opt.left + '%';
			if (type === 'plus') {
				var crt = currentRange(self, currentChange);
				self.defineObj.current = crt;
			}
			if (type === 'reduce') {
				var crt = currentRange(self, -currentChange);
				self.defineObj.current = crt;
			}
	   	});
	}

	// 淡入淡出过度效果
	// @param {string} direction 切换方向 [plus|reduce]
	// @param {object} self 调用者实例 this
	// @param {object} opt {
	// 		container: [object | 轮播容器]
	//  	left: [number | 初始容器偏移量],
	//  	multiple: [number | 将要偏移的100的倍数],
	//  	currentChange: [number | 显示图片下标改变量],
	//  	animate: [number | 过度效果时间(ms)]
	//  }
	var FadeAnimate = function (direction, self, opt) {
		self.rendering  = true;

		var type          = direction || 'plus';
		var currentChange = parseInt(opt.currentChange) || 1;
		var speed         = opt.animate || 800;
		var box           = opt.container;

		if (box.classList) {
			box.classList.remove('fadeIn');
			box.classList.add('fadeOut');
		} else {
			box.className = 'carousel animated fadeOut';
		}

		box.addEventListener('animationend', function() {
        	// 销毁事件
			box.removeEventListener('animationend', arguments.callee, false);

			if (box.classList) {
				box.classList.remove('fadeOut');
				box.classList.add('fadeIn');
			} else {
				box.className = 'carousel animated fadeIn';
			}

			if (type === 'plus') {
				var crt = currentRange(self, currentChange);
				self.defineObj.current = crt;
			}
			if (type === 'reduce') {
				var crt = currentRange(self, -currentChange);
				self.defineObj.current = crt;
			}
		});
	}

	// 错误处理
	// @param {string} state 错误状态
	// @param {string} msg 错误信息
	// @param {array} errorArr 外部错误对象数组
	// @return {object} obj { state: [state], msg: [msg] }
	var error = function (state, msg, errorArr) {
		state    = state || 'error';
		msg      = msg || '错误!';
		errorArr = errorArr || [];
		var obj  = { state: state, msg: msg };
		errorArr.push(obj);
		return obj;
	}

	// 清除轮播容器内多余的元素
	// @param {object} container 轮播容器
	// @param {array} items 多余轮播元素 .item
	// @return void
	var clear = function (container, items) {
		for (var i = items.length - 1; i >= 0; i--) {
			container.removeChild(items[i]);
		}
	}

	// 轮播容器处理
	// @param {object} container 轮播容器
	// @param {object} opt 轮播容器设置参数
	// @return void
	var setContainer = function (container, opt) {
		opt = opt || {};

		clear(container, opt.items);

		var getValue = function (value) {
			var val;
			typeof value === 'number' ? val = value + 'px' : val = value;
			return val;
		}

		container.style.height     = getValue(opt.height);
		container.style.clear      = 'both';
		container.style.overflow   = 'hidden';
		container.style.listStyle  = 'none';
		container.style.margin     = getValue(opt.margin);
		container.style.padding    = getValue(opt.padding);
		container.style.visibility = 'hidden';
		container.className        = 'carousel animated fadeIn';
	}

	// 获取显示顺序 左右轮播left 上下轮播 top = left
	// @param {array} arr 图片数组
	// @param {number} current 当前显示图片下标
	// @param {object} self 调用方的this
	// @return {object} { renderArr: [index], renderNum: [renderIndex], left: [leftLen] }
	var getIndex = function (arr, current, self) {
		var index       = [];
		var renderIndex = [];
		var length      = arr.length;

		// 向上取整作为居中位置
		var show     = Math.ceil(arr.length / 2);
		var leftLen  = show - 1;
		var rightLen = length - show;

		// current 允许范围 0 - length
		var range = function (index) {
			var i = index;
			if (index > length - 1) i = 0;
			if (index < 0) i = length - 1;
			return i;
		}

		current = range(current);
		index.push(current);
		var prev = current;
		var next = current;

		// 默认向右为next
		for (var i = leftLen; i > 0; i--) {
			prev++;
			if (prev > length - 1) {
				prev = 0;
			}
			index.unshift(prev);
		}

		for (var i = rightLen; i > 0; i--) {
			next--;
			if (next < 0) {
				next = length - 1;
			}
			index.push(next);
		}

		// 轮播数量小于 3
		if (index.length === 2) {
			// 只有2张图片时左边为空
			// 如果 current 为 0，则左边需要补为 1
			// 如果 current 为 1，则左边需要补为 0
			current === 0 ? index.unshift(index[current + 1]) : index.unshift(index[current]);
			leftLen += 1;
		} else if (index.length === 1) {
			// 只有1张图片时左右都为空
			// 左右都补 current 即可
			index.unshift(index[current]);
			index.push(index[current]);
			leftLen += 1;
			rightLen += 1;
		} else {
			// left 在arr.length大于3的情况下奇偶情况有所不同
			leftLen  = arr.length % 2 === 0 ? leftLen + 1 : leftLen;
		}

		renderIndex.splice(0, renderIndex.length);
		for (var i = 0; i < index.length; i++) {
			renderIndex.unshift(index[i]);
		}

		for (var i = 0; i < renderIndex.length; i++) {
			index[i] = arr[renderIndex[i]];
		}

		if (self) {
			// 实际渲染图片路径数组
			self.renderArr = index;
			// 实际渲染图片路径数组
			self.renderIndex = renderIndex;
		}

		return { renderArr: index, renderIndex: renderIndex, left: leftLen };
	}

	// 自动播放
	var autoPlay = function (self) {
		// 防止创建多个 计时器
		if (!self.isAutoPlaying) {
			var p = setInterval(function () {
				next(self);
			}, self.opts.speed);
			self.player = p;
		}

		self.isAutoPlaying = true;
		self.isAutoPlayStop = false;
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
		setTimeout(function () {
			// 允许自动播放而且当前不是在停止状态
			if (!self.isAutoPlayStop) autoPlay(self);
		}, 300);
	}

	// 创建轮播分页
	// @param {object} pagerContainer 分页容器
	// @param {object} self 调用方的this
	var createPager = function (pagerContainer, self) {
		if (!pagerContainer) {
			var error = error('error', 'pager参数错误!未能选择到分页的容器。', self.errorArr);
			return;
		}

		var left        = self.left;
		var container   = self.container;
		var current     = self.defineObj.current;
		var animate     = self.opts.animate;
		var animateType = self.opts.animateType;
		var arr         = self.dataArr;
		var pagerCtrl   = self.opts.pagerCtrl;
		var active      = self.opts.pagerCon.active;
		var pagerEvent  = self.opts.pagerCon.event;
		var pagerDelay  = self.opts.pagerCon.delay;
		var pagerStyle  = self.opts.pagerStyle;

		// 分页点击事件
		var change = function (current, e) {
			if (self.rendering) return;
			var id, toIndex = null, fromIndex = null;
			if (!span.dataset) id = e.target.title;
			else id = e.target.dataset.id;
			var index = parseInt(id);
			current   = self.defineObj.current;

			for (var i = 0; i < self.renderIndex.length; i++) {
				if (self.renderIndex[i] === index) toIndex = i;
				if (self.renderIndex[i] === current) fromIndex = i;
			}

			if (toIndex === null) {
				console.error(error('error', '未能获取到选择分页所对应的下标!分页操作终止!', self.errorArr));
				return;
			}

			var multiple, change;
			if (index > current) {
				// 选择分页在当前图片后面(相对于原数组)
				multiple = toIndex - fromIndex;
				change   = index - current;

				if (animateType === 'slide') SlideLRAnimate('plus', self, { container: container, left: left, multiple: multiple, currentChange: change, animate: animate });
				if (animateType === 'fade') FadeAnimate('plus', self, { container: container, left: left, multiple: multiple, currentChange: change, animate: animate });
			}
			if (index < current) {
				// 选择分页在当前图片前面(相对于原数组)
				multiple = fromIndex - toIndex;
				change   = current - index;
				if (animateType === 'slide') SlideLRAnimate('reduce', self, { container: container, left: left, multiple: multiple, currentChange: change, animate: animate });
				if (animateType === 'fade') FadeAnimate('reduce', self, { container: container, left: left, multiple: multiple, currentChange: change, animate: animate });
			}
		}

		// 循环原始数组 一图对应一分页
		for (var i = 0; i < arr.length; i++) {
			var span = document.createElement('span');

			// 分页样式
			// pagerStyle
			for (var style in pagerStyle) {
				span.style[style] = pagerStyle[style];
			}
			span.className             = 'item-pager';

			// data- 兼容性
			if (!span.dataset) span.title = i;
			else span.dataset.id = i;

			// 初始化样式
			current === i ? span.style.backgroundColor = active : '';

			// 绑定分页控制事件
			var timer;
			if (pagerCtrl) span.addEventListener(pagerEvent, function (e) {
				// 重置计时器
				changeResetPlay(self);
				// 如果是鼠标悬浮触发 设置鼠标事件延时
				if (pagerEvent === 'mouseover' || pagerEvent === 'mouseenter') {
					timer = setTimeout(function () {
						change(current, e);
					}, pagerDelay);
				} else {
					change(current, e);
				}
			});
			span.addEventListener('mouseout', function () {
				clearTimeout(timer);
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
			if (self.defineObj.current === i) {
				itemsPager[i].style.backgroundColor = active;
			}
		}
	}

	// 前一个 由于此处的计算是相对于下标
	// 所以向后是减
	var prev = function (self) {
		var direction   = self.opts.direction;
		var animateType = self.opts.animateType;
		var animate     = self.opts.animate;
		var container   = self.container;
		var left        = self.left;

		if (direction === 'right') {
			if (animateType === 'slide') SlideLRAnimate('reduce', self, { container: container, left: left, animate: animate });
			if (animateType === 'fade') FadeAnimate('reduce', self, { container: container, left: left, animate: animate });
		}
		if (direction === 'left') {
			if (animateType === 'slide') SlideLRAnimate('plus', self, { container: container, left: left, animate: animate });
			if (animateType === 'fade') FadeAnimate('plus', self, { container: container, left: left, animate: animate });
		}
	}
	// 后一个
	var next = function (self) {
		var direction   = self.opts.direction;
		var animateType = self.opts.animateType;
		var animate     = self.opts.animate;
		var container   = self.container;
		var left        = self.left;

		if (direction === 'right') {
			if (animateType === 'slide') SlideLRAnimate('plus', self, { container: container, left: left, animate: animate });
			if (animateType === 'fade') FadeAnimate('plus', self, { container: container, left: left, animate: animate });
		}
		if (direction === 'left') {
			if (animateType === 'slide') SlideLRAnimate('reduce', self, { container: container, left: left, animate: animate });
			if (animateType === 'fade') FadeAnimate('reduce', self, { container: container, left: left, animate: animate });
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



	// 轮播方法
	// 水平方向轮播
	var Horizontal = function (options) {
		this.opts      = Init(options);
		this.container = this.opts.container;
		this.dataArr   = this.opts.dataArr;
		this.length    = this.dataArr.length;
		this.errorArr  = [];
		this.defineObj = { _current: 0 }
		this.isPostBack= false;

		var self       = this;
		var boxOpt     = {};
		boxOpt.height  = this.opts.height;
		boxOpt.margin  = this.opts.margin;
		boxOpt.padding = this.opts.padding;
		boxOpt.items   = this.opts.items;

		// 赋值指定初始化current
		this.defineObj.current = this.opts.current;

		// 处理轮播容器
		setContainer(this.container, boxOpt);

		// 获取图片显示顺序
		var indexObj     = getIndex(this.dataArr, this.defineObj.current, this);
		// 容器偏移量
		this.left        = -100 * indexObj.left;

		// 创建元素
		this.render(indexObj);

		// 初始化总宽度
		this.container.style.width      = this.renderArr.length * 100 + '%';
		// 初始化偏移量
		this.container.style.marginLeft = this.left + '%';

		// 初始化延时显示所有轮播
		setTimeout(function () {
			self.container.style.visibility = 'visible';
		}, this.opts.delay);

		// 创建分页
		var pagerContainer;
		if (this.opts.isPager) {
			pagerContainer = document.getElementById(this.opts.isPager) || document.getElementsByClassName(this.opts.isPager)[0];
			createPager(pagerContainer ,this);
		}

		// 是否正在自动播放
		this.isAutoPlaying = false;
		// 自动播放是否被停止
		this.isAutoPlayStop = false;
		// 自动播放计时器
		this.player;
		// 是否正在渲染
		this.rendering = false;

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
		Object.defineProperty(this.defineObj, "current", {
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

					// 重新渲染
					// 获取图片显示顺序
					if (self.isPostBack) {
						var indexo = getIndex(self.dataArr, value, self);
						self.render(indexo);
					}
		        }
		    }
		});

	}
	Horizontal.prototype.createItem = function (src, href, bg) {
		var isText    = this.opts.isText;
		var textStyle = this.opts.textStyle;
		var item      = document.createElement('a');
		var img       = document.createElement('img');
		var width     = 100 / this.renderIndex.length;
		href          = href || 'javascript: void(0);';

		item.className        = 'item';
		item.style.cssText    = 'width: ' + width + '%;display: block;float: left;height: 100%;border: 0;';
		bg ? item.style.background = bg : item.style.background = this.opts.background;
		item.href             = href;

		if (isText === true) {
			// 如果是显示文字 此时src即为文字内容
			img = document.createElement('div');
			img.innerHTML = src;
			for(var style in textStyle) {
				item.style[style] = textStyle[style];
			}
		} else {
			// 显示图片
			img.src            = src;
			try {
				img.alt        = src.split('/')[src.split('/').length - 1];
			} catch (e) {
				console.warn(e);
			}
		}

		img.style.width = this.opts.imgWidth;
		img.style.height = this.opts.imgHeight;
		item.appendChild(img);

		return item;
	}
	Horizontal.prototype.render = function (indexObj) {
		clear(this.container, this.container.childNodes);
		for (var i = 0; i < indexObj.renderArr.length; i++) {
			var node;
			if (typeof indexObj.renderArr[i] === 'string') {
				node = this.createItem(indexObj.renderArr[i]);
			} else if (typeof indexObj.renderArr[i] === 'object' && !indexObj.renderArr[i].length) {
				var src  = indexObj.renderArr[i][this.opts.imgName] || '';
				var href = indexObj.renderArr[i][this.opts.hrefName] || '';
				var bg   = indexObj.renderArr[i][this.opts.backgroundName];
				node = this.createItem(src, href, bg);
			}

			this.container.appendChild(node);
		}

		this.rendering  = false;
		this.isPostBack = true;
	}
	Horizontal.prototype.next = function (n) {
		if (!n) return;
		var btn, self = this;

		btn = document.getElementById(n) || document.getElementsByClassName(n)[0];
		btn ?
		btn.addEventListener('click', function () {
			if (self.rendering) return;
			// 重置计数器
			changeResetPlay(self);
			next(self);
		}) :
		console.warn('获取按钮失败!请正确指定按钮的id或者classname!');
	}
	Horizontal.prototype.prev = function (p) {
		if (!p) return;
		var btn, self = this;

		btn = document.getElementById(p) || document.getElementsByClassName(p)[0];
		btn ?
		btn.addEventListener('click', function () {
			if (self.rendering) return;
			// 重置计数器
			changeResetPlay(self);
			prev(self);
		}) :
		console.warn('获取按钮失败!请正确指定按钮的id或者classname!');
	}
	Horizontal.prototype.play = function () {
		autoPlay(this);
	}
	Horizontal.prototype.stop = function () {
		stopPlay(this);
	}


	// TODO: 垂直方向轮播
	var Vertical = function (options) {
		var opts = Init(options);

		console.log(opts);
		console.warn('%c Sorry, Vertical is Under development...', 'font-size: 20px;color: #ff5f00;');
	}

	// 工厂函数
	var Factory = function (type, options) {
		var carousel = null;
		switch (type) {
			case 'horizontal':
				carousel = new Horizontal(options);
				break;
			case 'vertical':
				carousel = new Vertical(options);
				break;
		}

		return carousel;
	}

	/**
	 * Carousel Public
	 * @param {string} target 轮播容器id
	 * @param {string} type 轮播类型
	 * @param {object} options 轮播配置属性
	 */
	var Carousel = {
		// 初始化一个轮播
		// @param {string} target 轮播容器的id
		// @param {string} type 轮播类型 [horizontal|vertical]
		// @param {object} options 轮播参数
		on: function (target, type, options) {
			this.errorArr = [];
			options       = options || {};

			if (!target) {
				var err = error('error', '请输入有效的容器id!', this.errorArr);
				console.error(err);
				return this;
			}

			var container = document.getElementById(target);
			if (!container)  {
				var err = error('error', '未能选择到轮播容器!请确定输入有效的id!', this.errorArr);
				console.error(err);
				return this;
			}

			var items = container.getElementsByClassName('item');

			var dataArr = options.datas || [];
			if (typeof dataArr !== 'object' || !dataArr.length || dataArr.length <= 0) {
				var err = error('error', 'datas参数无效或错误!请确定datas值为长度大于0的数组!', this.errorArr);
				console.error(err);
				return this;
			}

			var typeInvalid = function (self) {
				var err = error('error', 'type参数可能无效!未能找到指定类型!', self.errorArr);
				console.error(err);
				return self;
			}

			options.container = container;
			options.items = items;

			var carousel = Factory(type, options);
			carousel ? carousel : carousel = typeInvalid(this);
			return carousel;
		},
		// 清除轮播显示 TODO： 事件未清除!
		// @param {object|array} carousel 轮播实例化后的对象或者实例数组
		off: function (carousel) {
			if (!carousel) return;
			if (carousel instanceof Horizontal || carousel instanceof Vertical) {
				var container = carousel.container;
				var childs = container.parentNode.childNodes;
			    for (var j = childs.length - 1; j >= 0; j--) {
			        container.parentNode ? container.parentNode.removeChild(childs.item(j)) : console.warn(container);
			    }
			} else if (typeof carousel === 'object' && carousel.length) {
				for (var i = 0; i < carousel.length; i++) {
					var container = carousel[i].container;
					container ? container.parentNode : console.warn('数组 carousel 第' + i + ' 个元素[' + carousel[i] +']无效!');
					var childs = container.parentNode.childNodes;
				    for (var j = childs.length - 1; j >= 0; j--) {
				        container.parentNode ? container.parentNode.removeChild(childs.item(j)) : console.warn(container);
				    }
				}
			} else {
				console.warn('参数 carousel 必须是一个实例或者实例数组!');
			}
		}
	}

	window.Carousel = Carousel;

}) (window, document);