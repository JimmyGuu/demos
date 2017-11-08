/**
 * Edge Dialog
 * @file    Edge Dialog Plugin
 * @author  Jehorn(gerardgu@outlook.com)
 * @version 2.0.1
 * warnings:
 * 1. 如果要在对话框中再次添加对话框，请在父类对话框的单次执行方法(afterCreate)中声明
 * 而且子对话框必须指定遮罩层id(mask.id)和对话框id(id)，否则会出现累次叠加的问题.
 * 同时，如果想在在直接关闭父对话框时关闭子对话框，需要在外部关闭方法中传参：
 * 比如父：dialogSup，子：dialogSub，在外部调用关闭方法：dialogSup.close(fn() { dialogSub ? dialogSub.close() : ''; });
 * 2. del 方法调用后，不会自动解绑已经绑定被删除类的事件
 * 3. add 方法的 fn 参数是必须的，而且该类必须要有 create() 和 close() 方法
 */
;
(function(factory) {
	// FIXME Type of AMD / CommonJS Maybe cannot work.
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['document', 'window'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('document'), require('window'));
	} else {
		// Browser globals
		factory(document, window);
	}
}(function(document, window) {

	// Inside counter
	// @private
	var count = 0;

	/**
	 * Options Internal
	 * @param  {Object} opts    所有自定义参数
	 * @return {Object} options Options after Internal
	 */
	var initOptions = function(opts) {
		var options = opts || {};

		// @param {Object} styles 自定义对话框样式
		options.styles = options.styles || {};
		// @param {string} content 对话框内容
		options.content = options.content || '&nbsp;';
		// @param {Object} mask     遮罩层自定义样式
		// @param {Array} mask      只接受rgb,用数组表示
		// @param {string | number} mask 透明度 [0, 1]
		options.mask = options.mask ? options.mask = {
			color: options.mask.color || [0, 0, 0],
			opacity: options.mask.opacity || 0.5,
			zIndex: options.mask.zIndex || count + 1,
			id: options.mask.id || 'edgeDialogMask' + count,
		} : {
			color: [0, 0, 0],
			opacity: 0.5,
			zIndex: count + 1,
			id: 'edgeDialogMask' + count
		};
		options.id = options.id || 'edgeDialogContainer' + count;
		options.delay = options.delay || 30;
		options.callback = options.callback || function() {};
		options.afterCreate = options.afterCreate || function() {};
		options.beforeClose = options.beforeClose || function() {};

		return options;
	}

	/**
	 * Bind event
	 * @param  {Object}   self 调用方法的this
	 * @param  {Object}   node 要绑定事件的DOM
	 * @param  {string}   eventType 事件类型
	 * @param  {Function} fn 事件执行的方法
	 * @param  {boolean}  stopPropagation 是否阻止冒泡
	 * @return void
	 */
	var bindEvent = function(self, node, eventType, fn, stopPropagation) {
		node.addEventListener(eventType, function(event) {
			if (stopPropagation) {
				// 阻止子元素触发父元素的事件
				if (event.target === this) {
					fn(self);
				}
			} else {
				fn(self);
			}
		});
	}

	/**
	 * class extends
	 * @param  {Function} Child  子类
	 * @param  {Function} Parent 父类
	 * @return void
	 */
	var extend = function(Child, Parent) {　　　　
		var F = function() {};　　　　
		F.prototype = Parent.prototype;　　　　
		Child.prototype = new F();　　　　
		Child.prototype.constructor = Child;　　　　
		Child.uber = Parent.prototype;　　
	}



	/**
	 * Create DOM
	 * @param  {string} target 指定容器
	 * @return {Object} object  返回对象
	 * @return {Object} object.body       返回对象 document.body
	 * @return {Object} object.container  返回对象 dialog wrapper
	 * @return {Object} object.mask       返回对象 dialog 遮罩层
	 */
	var create = function(opts) {
		var body = document.body;
		var container = document.createElement('div');
		var containerId = opts.id;
		var mask = document.createElement('div');
		var maskId = opts.mask.id;
		var isMask = document.getElementById(maskId);

		// default styles
		container.style.cssText =
			'display: none;position: absolute;background-color: #fff;color: #000;transition: all .3s ease-out;';

		mask.style.cssText =
			'display: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, .5);transition: all .3s ease-out;z-index: ' +
			(2000 + count) + ';';
		mask.id = maskId;
		mask.style.zIndex = opts.mask.zIndex;

		container.id = containerId;

		// custom styles
		for (var style in opts.styles) {
			container.style[style] = opts.styles[style];
		}
		if (typeof opts.mask.color === 'string') {
			mask.style.background = opts.mask.color
		} else if (opts.mask.color instanceof Object && opts.mask.color.length) {
			var bg = 'rgba(';
			for (var len = opts.mask.color.length, c = 0; c < len; c++) {
				bg += (opts.mask.color[c] + ', ');
			}
			bg += (opts.mask.opacity + ')');

			mask.style.background = bg;
		} else {
			mask.style.background = 'rgba(0, 0, 0, .5)';
		}

		container.innerHTML = opts.content;

		isMask ? '' : body.appendChild(mask);

		return {
			body: body,
			container: container,
			mask: mask,
			id: containerId,
			maskId: maskId
		}
	}

	/**
	 * Normal Internal
	 * @param  {Object} opts Options
	 * @return {Object} void
	 */
	var InternalDialog = function(opts) {
		var self = this;
		var isClose = opts.isClose === false ? false : true;
		var counter = 0;

		this.doms = create(opts);
		this.id = this.doms.id;
		this.delay = opts.delay;
		this.content = opts.content;
		this.fadeInType = 'fadeInUp';
		this.fadeOutType = 'fadeOutDown';
		this.isContainer = document.getElementById(this.id) || false;

		// Dialog position
		this.position = function() {
			this.doms.container.style.width = opts.width || 'auto';
			this.doms.container.style.height = opts.height || 'auto';
			this.doms.container.style.top = opts.top || 'auto';
			this.doms.container.style.bottom = opts.bottom || 'auto';
			this.doms.container.style.left = opts.left || 'auto';
			this.doms.container.style.right = opts.right || 'auto';
		}

		// Create DOM
		this.create = function(callback) {
			var timer;

			this.isContainer ? console.error('Container id: ' + this.id + ' had been used!') : this.doms.mask.appendChild(this.doms.container);

			// 此处DOM创建完毕 执行 afterCreate 方法
			if (typeof opts.afterCreate === 'function') {
				counter === 0 ? opts.afterCreate() : '';
			}

			// 定位
			this.position();

			// 遮罩层显示
			this.doms.mask.style.display = 'block';

			// 对话框显示
			window.clearTimeout(timer);
			timer = window.setTimeout(function() {
				self.doms.container.style.display =
					'block';
				self.doms.container.className =
					'dialog-animate ' + self.fadeInType;

				// 自定义回调方法执行
				typeof callback === 'function' ? callback(self) : '';

				// 内部计数器
				counter++;
			}, this.delay);
		}

		// Destroy/Delete the box.
		this.close = function(callback) {
			var timer;
			var container = document.getElementById(self.id);
			var mask = document.getElementById(self.doms.maskId);

			// 自定义关闭前执行方法
			typeof opts.beforeClose === 'function' ? opts.beforeClose() : '';

			if (container) {
				container.className = 'dialog-animate ' + self.fadeOutType;

				typeof callback === 'function' ? callback() : '';

				window.clearTimeout(timer);
				timer = window.setTimeout(function() {
					var _timer;

					if (container) mask.removeChild(
						container);

					window.clearTimeout(_timer);
					_timer = window.setTimeout(function() {
						mask.style.display =
							'none';
					}, self.delay);
				}, 200);
			}
		}

		// Click blank erea close the dialog.
		isClose ? bindEvent(this, this.doms.mask, 'click', this.close,
			true) : '';
	}

	/**
	 * From Bottom
	 * @class
	 * @extends InternalDialog
	 * @param {Object} opts Options
	 * @return void
	 */
	var BottomDialog = function(opts) {
		InternalDialog.call(this, opts);

		this.fadeInType = 'fadeInUp';
		this.fadeOutType = 'fadeOutDown';

		/**
		 * Dialog position
		 * @override
		 */
		this.position = function() {
			this.doms.container.style.width = opts.width ||
				'100%';
			this.doms.container.style.height = opts.height ||
				'auto';
			this.doms.container.style.top = opts.top || 'auto';
			this.doms.container.style.bottom = opts.bottom ||
				'-100%';
			this.doms.container.style.left = opts.left || '0';
			this.doms.container.style.right = opts.right ||
				'auto';
		}
	}

	/**
	 * From Top
	 * @class
	 * @extends InternalDialog
	 */
	var TopDialog = function(opts) {
		InternalDialog.call(this, opts);

		this.fadeInType = 'fadeInDown';
		this.fadeOutType = 'fadeOutUp';

		/**
		 * Dialog position
		 * @override
		 */
		this.position = function() {
			this.doms.container.style.width = opts.width ||
				'100%';
			this.doms.container.style.height = opts.height ||
				'auto';
			this.doms.container.style.top = opts.top || '-100%';
			this.doms.container.style.bottom = opts.bottom ||
				'auto';
			this.doms.container.style.left = opts.left || '0';
			this.doms.container.style.right = opts.right ||
				'auto';
		}
	}

	/**
	 * From Right
	 * @class
	 * @extends InternalDialog
	 */
	var RightDialog = function(opts) {
		InternalDialog.call(this, opts);

		this.fadeInType = 'fadeInRight';
		this.fadeOutType = 'fadeOutLeft';

		/**
		 * Dialog position
		 * @override
		 */
		this.position = function() {
			this.doms.container.style.width = opts.width ||
				'256px';
			this.doms.container.style.height = opts.height ||
				'100%';
			this.doms.container.style.top = opts.top || '0';
			this.doms.container.style.bottom = opts.bottom ||
				'auto';
			this.doms.container.style.left = opts.left ||
				'auto';
			this.doms.container.style.right = opts.right ||
				'-100%';
		}
	}

	/**
	 * From Left
	 * @class
	 * @extends InternalDialog
	 */
	var LeftDialog = function(opts) {
		InternalDialog.call(this, opts);

		this.fadeInType = 'fadeInLeft';
		this.fadeOutType = 'fadeOutRight';

		/**
		 * Dialog position
		 * @override
		 */
		this.position = function() {
			this.doms.container.style.width = opts.width ||
				'256px';
			this.doms.container.style.height = opts.height ||
				'100%';
			this.doms.container.style.top = opts.top || '0';
			this.doms.container.style.bottom = opts.bottom ||
				'auto';
			this.doms.container.style.left = opts.left ||
				'-100%';
			this.doms.container.style.right = opts.right ||
				'auto';
		}
	}

	// @extends InternalDialog
	extend(BottomDialog, InternalDialog);
	extend(TopDialog, InternalDialog);
	extend(RightDialog, InternalDialog);
	extend(LeftDialog, InternalDialog);

	// @Array All Dialogs
	var myDialogs = [{
		name: 'bottom',
		fn: BottomDialog
	}, {
		name: 'top',
		fn: TopDialog
	}, {
		name: 'right',
		fn: RightDialog
	}, {
		name: 'left',
		fn: LeftDialog
	}];

	/**
	 * Create factory
	 * @param  {string} type   Type of Dialog
	 * @param  {Object} args   Options
	 * @return {Object} dialog A Dialog
	 */
	var factory = function(type, args) {
		var dialog;
		for (var i = myDialogs.length - 1; i >= 0; i--) {
			if (myDialogs[i].name === type) {
				dialog = new myDialogs[i].fn(args);
			}
		}

		return dialog;
	}

	/**
	 * public methods
	 */
	var bindDialog = [];
	var counter = 0;
	var EdgeDialog = {
		/**
		 * Create
		 * @param  {string} target Wrapper 'id'/'classname'
		 * @param  {Object} type   Type of Dialog
		 * @param  {Object} args   Options
		 * @return {Object} {...}
		 * @return {Function} close A close method for dialog
		 * @return {Object}   obj   A Dialog
		 */
		on: function(target, type, args) {
			var self = this;
			var options = initOptions(args);
			var callback = options.callback;
			var box = document.getElementById(target) ||
				document.getElementsByClassName(target)[0];

			var dialog = factory(type, options);

			if (dialog && dialog.create) {
				var bindObj = {
					uid: counter,
					fn: function() {
						dialog.create(callback)
					}
				};

				bindDialog.push(bindObj);

				box.addEventListener('click', bindDialog[counter].fn);

				count++;
				counter++;

				return {
					state: 'success',
					close: dialog.close,
					obj: dialog,
					uid: bindObj.uid,
					bindDialog: bindDialog
				};
			} else {
				var msg = 'Get none create dialog or dialog.create()!';
				console.warn(msg);
				return {
					state: 'error',
					msg: msg
				}
			}

		},
		/**
		 * Remove Event Listener
		 */
		off: function(target, uid) {
			var box = document.getElementById(target) ||
				document.getElementsByClassName(target)[0];
			box.removeEventListener('click', bindDialog[uid].fn);
		},
		/**
		 * Active Event Listener
		 */
		active: function(target, uid) {
			var box = document.getElementById(target) ||
				document.getElementsByClassName(target)[0];
			box.addEventListener('click', bindDialog[uid].fn);
		},
		/**
		 * Add a Dialog Object
		 */
		add: function(fn, name) {
			var isHad = false;

			name = name || Math.random().toString(36).substr(2);

			for (var len = myDialogs.length, i = len - 1; i >= 0; i--) {
				if (name === myDialogs[i].name) {
					console.warn(name + ' had been subscribed!');
					isHad = true;
					return;
				}
			}

			if (!isHad) {
				var obj = {
					name: name,
					fn: fn
				}
				myDialogs.push(obj);

				var result = {
					state: 'success',
					obj: myDialogs
				}

				return result;
			} else {
				return 'Had been subscribed name.';
			}
		},
		/**
		 * Delete
		 */
		del: function(name) {
			if (name) {
				myDialogs = myDialogs.filter(
					function(el) {
						if (el.name !== name) {
							return el;
						}
					}
				);
				var result = {
					state: 'success',
					obj: myDialogs
				}

				console.log(bindDialog)

				return result;
			} else {
				return {
					state: 'error',
					msg: 'name is null.'
				}
			}

		}
	}

	window.EdgeDialog = EdgeDialog;
}));
