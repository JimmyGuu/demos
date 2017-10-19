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
		obj._current    = options.index || 0;
		// 分页容器id
		obj.isPager     = options.pager;
		// 分页是否具有控制功能
		obj.pagerCtrl   = options.pagerCtrl === undefined ? true : options.pagerCtrl;
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


		return obj;
	}

	// 错误处理
	var error = function (state, msg, errorArr) {
		state    = state || 'error';
		msg      = msg || '错误!';
		errorArr = errorArr || [];
		var obj  = { state: state, msg: msg };
		errorArr.push(obj);
		return obj;
	}

	// 清除轮播容器内的元素
	var clear = function (container, items) {
		for (var i = items.length - 1; i >= 0; i--) {
			container.removeChild(items[i]);
		}
	}

	// 轮播容器处理
	var setContainer = function (container, opt) {
		opt = opt || {};

		clear(container, opt.items);

		var getValue = function (value) {
			var val;
			typeof value === 'number' ? val = value + 'px' : val = value;
			return val;
		}
		var width    = 100 * opt.dataArr.length;

		container.style.width      = width + '%';
		container.style.height     = getValue(opt.height);
		container.style.clear      = 'both';
		container.style.overflow   = 'hidden';
		container.style.listStyle  = 'none';
		container.style.margin     = getValue(opt.margin);
		container.style.padding    = getValue(opt.padding);
		container.style.visibility = 'hidden';
		container.className        = 'carousel animated fadeIn';
	}



	// 轮播方法
	// 水平方向轮播
	var Horizontal = function (options) {
		this.opts      = Init(options);
		this.container = this.opts.container;
		this.length    = this.opts.dataArr.length;
		this.errorArr = [];

		var boxOpt    = {};
		boxOpt.height  = this.opts.height;
		boxOpt.margin  = this.opts.margin;
		boxOpt.padding = this.opts.padding;
		boxOpt.items   = this.opts.items;
		boxOpt.dataArr = this.opts.dataArr;

		// 处理轮播容器
		setContainer(this.container, boxOpt);

		// 创建元素
		var items;
		for (var i = 0; i < this.opts.dataArr.length; i++) {
			var node = this.createItem(this.opts.dataArr[i]);
			this.container.appendChild(node);
		}

		console.log(this.opts);

		// 监听 current index 的变化
		Object.defineProperty(this.opts, "current", {
		    get: function() {
		        return this._current;
		    },
		    set: function(value) {
		        if (value !== this._current) {
		            this._current = value;
		            
		        }
		    }
		});

	}

	Horizontal.prototype.createItem = function (src) {
		var item  = document.createElement('li');
		var img   = document.createElement('img');
		var width = 100 / length;

		item.className     = 'item';
		item.style.cssText = 'width: ' + width + '%;display: block;float: left;height: 100%;background: ' + this.opts.background +';';
		img.src            = src;
		img.alt            = src.split('/')[src.split('/').length - 1];
		img.style.cssText  = 'width: 100%;';
		item.appendChild(img);

		return item;
	}

	// 垂直方向轮播
	var Vertical = function (options) {
		var opts = Init(options);

		console.log(opts);
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