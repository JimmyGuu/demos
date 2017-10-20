;(function (window, document) {
	// 私有通用属性
	// 初始化参数
	var Init = function (options) {
		var obj = {};

		// 原始图片路径数组
		obj.dataArr     = options.datas;
		// 创建没有图片的轮播 将会创建指定宽高背景色内容的轮播
		// 设置此项将会使轮播以字符串显示 datas 数组中的内容
		// 必须设置为布尔值 ture 起效
		obj.isText      = options.isText === true ? true : false;
		obj.text        = options.text || 'carousel';
		obj.background  = options.background || '#efefef';
		// 初始化显示图片
		obj.current     = options.index || 0;
		// 分页容器id
		obj.isPager     = options.pager;
		// 分页是否具有控制功能
		obj.pagerCtrl   = options.pagerCtrl === undefined ? true : options.pagerCtrl;
		// 分页配置属性
		obj.pagerCon    = options.pagerCon ? options.pagerCon = {
			active: options.pagerCon.active || '#ff5f00',
			normal: options.pagerCon.normal || '#efefef'
		} : {
			active: '#ff5f00',
			normal: '#efefef'
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
		obj.imgWidth   = options.imgWidth || '100%';
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
		obj.hrefName     = options.hrefName || 'href';


		return obj;
	}

	// 验证current是否超出了显示
	var currentRange = function (current, length) {
		var i = current;

		if (current > length - 1) i = 0;
		if (current < 0) i = length - 1;

		return i;
	}

	// 左右滑动过渡效果 TODO
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
		self.rendering = true;

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
		setTimeout(function () {
			box.style.transition = 'none';
			box.style.marginLeft = opt.left + '%';
			if (type === 'plus') {
				var _c = currentRange(self.defineObj.current + currentChange, self.renderArr.length);
				self.defineObj.current = _c;
			}
			if (type === 'reduce') {
				var _c = currentRange(self.defineObj.current - currentChange, self.renderArr.length);
				self.defineObj.current = _c;
			}
		}, speed);
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
		self.rendering = true;

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

		setTimeout(function () {
			if (box.classList) {
				box.classList.remove('fadeOut');
				box.classList.add('fadeIn');
			} else {
				box.className = 'carousel animated fadeIn';
			}

			if (type === 'plus') {
				var _c = currentRange(self.defineObj.current + currentChange, self.renderArr.length);
				self.defineObj.current = _c;
			}
			if (type === 'reduce') {
				var _c = currentRange(self.defineObj.current - currentChange, self.renderArr.length);
				self.defineObj.current = _c;
			}
		}, (parseFloat(speed) / 2));
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

		var current        = self.defineObj.current;
		var animate        = self.opts.animate;
		var animateType    = self.opts.animateType;
		var container      = self.container;
		var arr            = self.opts.dataArr;
		var pagerCtrl      = self.opts.pagerCtrl
		var left           = self.left;
		var active         = self.opts.pagerCon.active;
		var normal         = self.opts.pagerCon.normal;

		// 循环原始数组 一图对应一分页
		for (var i = 0; i < arr.length; i++) {
			var span = document.createElement('span');

			// TODO 参数可配置
			span.style.display         = 'inline-block';
			span.style.backgroundColor = normal;
			span.style.width           = '30px';
			span.style.height          = '30px';
			span.style.borderRadius    = '50%';
			span.style.margin          = '10px 4px';
			span.style.cursor          = 'pointer';
			span.className             = 'item-pager';
			// data- 兼容性
			if (!span.dataset) span.title = i;
			else span.dataset.id = i;

			// 初始化样式
			current === i ? span.style.backgroundColor = active : '';

			// 分页点击事件
			var change = function (e) {
				var id, toIndex = null, fromIndex = null;
				if (!span.dataset) id = e.target.title;
				else id = e.target.dataset.id;
				var index = parseInt(id);
				current   = self.defineObj.current;

				// 重置计时器
				changeResetPlay(self);

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

			// 绑定分页控制事件
			if (pagerCtrl) span.addEventListener('click', change);

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
		var normal     = self.opts.pagerCon.normal;
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
		this.length    = this.opts.dataArr.length;
		this.errorArr  = [];
		this.defineObj = { _current: 0 }

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
		var indexObj     = getIndex(this.opts.dataArr, this.defineObj.current, this);
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
					var indexo = getIndex(self.opts.dataArr, value, self);
					self.render(indexo);
		        }
		    }
		});

	}
	Horizontal.prototype.createItem = function (src, href) {
		var isText = this.opts.isText;
		var item   = document.createElement('a');
		var img    = document.createElement('img');
		var width  = 100 / this.renderIndex.length;
		href       = href || 'javascript: void(0);';

		if (isText === true) {
			img = document.createElement('div');
		}

		item.className     = 'item';
		item.style.cssText = 'width: ' + width + '%;display: block;float: left;height: 100%;border: 0;background: ' + this.opts.background +';';
		item.href          = href;
		img.src            = src;
		try {
			img.alt        = src.split('/')[src.split('/').length - 1];
		} catch (e) {
			console.warn(e)
		}
		img.style.cssText  = 'width: ' + this.opts.imgWidth + ';height: ' + this.opts.imgHeight + ';';
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
				node = this.createItem(indexObj.renderArr[i][this.opts.imgName], indexObj.renderArr[i][this.opts.hrefName]);
			}

			this.container.appendChild(node);
		}

		this.rendering = false;
	}
	Horizontal.prototype.next = function (n) {
		if (this.rendering) return;
		var btn, self = this;
		// 重置计数器
		changeResetPlay(this);
		if (n) btn = document.getElementById(n) || document.getElementsByClassName(n)[0];
		btn ?
		btn.addEventListener('click', function () { self.next(self) }) :
		next(this);
	}
	Horizontal.prototype.prev = function (p) {
		if (this.rendering) return;
		var btn, self = this;
		// 重置计数器
		changeResetPlay(this);
		if (p) btn = document.getElementById(p) || document.getElementsByClassName(p)[0];
		btn ?
		btn.addEventListener('click', function () { self.prev(self) }) :
		prev(this);
	}
	Horizontal.prototype.play = function () {
		autoPlay(this);
	}
	Horizontal.prototype.stop = function () {
		stopPlay(this);
	}


	// 垂直方向轮播
	var Vertical = function (options) {
		var opts = Init(options);

		console.log(opts);
		consloe,warn('Waiting...')
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
		}
	}

	window.Carousel = Carousel;

}) (window, document);