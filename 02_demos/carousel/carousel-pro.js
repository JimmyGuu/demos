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

	// 横向轮播类
	// @param  {Object} options 轮播参数
	// @return {void}           null
	var Horizontal = function (options) {
		this.opts = Init(options);

		console.log(this.opts);
	}

	// 纵向轮播类
	// @param  {Object} options 轮播参数
	// @return {void}           null
	var Vertical = function (options) {
		var opts = Init(options);

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
			this.errorArr = [];
			options       = options || {};

			if (!target) {
				var err = error('error', '请输入有效的容器id!', this.errorArr);
				console.error(err);
				return this;
			}

			// 获取容器
			var container = document.getElementById(target);
			if (!container)  {
				var err = error('error', '未能选择到轮播容器!请确定输入有效的id!', this.errorArr);
				console.error(err);
				return this;
			}

			// 获取多余元素
			var items = container.getElementsByClassName('carousel-item');

			// 验证数组是否合法
			var dataArr = options.datas || [];
			if (typeof dataArr !== 'object' || !dataArr.length || dataArr.length <= 0) {
				var err = error('error', 'datas参数无效或错误!请确定datas值为长度大于0的数组!', this.errorArr);
				console.error(err);
				return this;
			}

			// 轮播类型验证不合法操作方法
			var typeInvalid = function (self) {
				var err = error('error', 'type参数可能无效!未能找到指定类型!', self.errorArr);
				console.error(err);
				return self;
			}

			// 将值赋到参数对象中
			options.container = container;
			options.items = items;

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