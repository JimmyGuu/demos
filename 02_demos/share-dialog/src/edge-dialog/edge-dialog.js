/**
 * EdgeDialog
 * Description A dialog box pops up from the edge
 * Author      Jehorn
 * Version     1.0.0
 * @param  {Object} window     The object of window
 * @param  {Object} document   The object of document
 * @return {Object} EdgeDialog The EdgeDialog bind to window
 */
;(function (window, document) {
    // Counter of bind events.
	var count  = 0;

	// Create DOM.
	var create = function (targets) {
		var body        = document.body;
		var container   = document.createElement('div');
		var mask        = document.createElement('div');
		var maskId      = 'edgeDialogMask';
		var isMask      = document.getElementById(maskId);

		container.style.cssText = 'display: none;position: absolute;background-color: #fff;color: #000;transition: all .3s ease-out;';

		mask.style.cssText = 'display: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, .5);transition: all .3s ease-out;z-index: ' + (2000 + count) +';';
		mask.id            = maskId;

		isMask ? '' : body.appendChild(mask);

		return {
			body: body,
			container: container,
			mask: mask
		}
	}

	// Bind event
	// @param {Object} self 调用方法的this
	// @param {Object} node 要绑定事件的DOM
	// @param {String} eventType 事件类型
	// @param {Function} fn 事件执行的方法
	// @param {Boolean} stopPropagation 是否阻止冒泡
	var bindEvent = function (self, node, eventType, fn, stopPropagation) {
		node.addEventListener(eventType, function (event) {
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

	// Internal types.
	// From bottom
	var BottomDialog     = function (create, opts) {
		var self         = this;
		var isClose      = opts.isClose || true;
		this.doms        = create();
		this.count       = 0;
		this.id          = opts.id || 'edgeDialogContainer' + this.count;
		this.isContainer = document.getElementById(this.id) || false;
		this.delay       = opts.delay || 30;
		this.content     = opts.content || '';

		// Create DOM
		this.create = function (callback) {
			this.isContainer ? console.error('Container id: ' + this.id + ' had been used!') : this.doms.mask.appendChild(this.doms.container);

			this.doms.container.id            = this.id;
			this.doms.container.style.width   = opts.width || '100%';
			this.doms.container.style.height  = opts.height || 'auto';
			this.doms.container.style.bottom  = opts.bottom || '-100%';
			this.doms.container.style.left    = opts.left || '0';

			this.doms.mask.style.display = 'block';

			window.setTimeout(function () {
				self.doms.container.style.display = 'block';
				self.doms.container.className = 'dialog-animate fadeInUp';

				self.insert(self.doms.container);

				self.count++;

				callback(self);
			}, this.delay);
		}

		// Insert custom content.
		this.insert = function (container) {
			container.innerHTML = this.content;
		}

		// Destroy/Delete the box.
		this.close = function () {
			var container = document.getElementById(self.id);
			self.doms.container.className = 'dialog-animate fadeOutDown';
			window.setTimeout(function () {
				if (container) self.doms.mask.removeChild(container);
				window.setTimeout(function () {
					self.doms.mask.style.display = 'none';
				}, self.delay);
			}, 200);
		}

		// Click blank erea close the dialog.
		isClose ? bindEvent(this, this.doms.mask, 'click', this.close, true) : '';

	}


	var TopDialog = function () {

	}

	var RightDialog = function () {

	}

	var LeftDialog = function () {

	}

	// Constructor.
	var EdgeDialog = function (options) {
		if (this instanceof EdgeDialog) {
			this.dialogs = [
				{ name: 'bottom', fn: BottomDialog },
				{ name: 'top', fn: TopDialog },
				{ name: 'right', fn: RightDialog },
				{ name: 'left', fn: LeftDialog }
			];
			this.binds = [];

			if (!options) return;
			this.isCreate = options.isCreate || true;

		} else {
			return new EdgeDialog(options);
		}
	}

	// Factory.
	var createDialog = function (_this, targets, type, args) {
		var dialog;
		for (var i in _this.dialogs) {
			if (_this.dialogs[i].name === type) {
				dialog = new _this.dialogs[i].fn(create, args);
			}
		}

        return dialog;
	}

	// Public methods.
	EdgeDialog.prototype = {
		/**
		 * 绑定事件
		 * @param {String} target 触发目标
		 * @param {String} type 弹出框类型
		 * @param {Function} callback 弹出框创建完毕后执行的方法, 该方法接收一个参数, 其为当前弹出框实例
		 * @param {Object} args 附加参数, 比如弹出框的高度/内容等
		 * @return {Object} 该方法返回一个对象，包括当前弹出框实例(obj)/当前弹出框事件id(uid)/当前弹出框关闭方法(close())
		 */
		on: function (targets, type, callback, args) {
			callback    = callback || function () {};
			var self    = this;
			var box     = document.getElementById(targets) || document.getElementsByClassName(targets)[0];
			var dialog  = createDialog(this, targets, type, args);
			var bindObj = {
				uid: count,
				fn: function () {
					dialog.create ? dialog.create(callback) : console.log('%c Get none create method!', 'color: #ddd;');
				}
			};

			this.binds.push(bindObj);

			box ? box.addEventListener('click', this.binds[count].fn) : console.error('Can not get the target!');

			count++;

			return {
				close: dialog.close,
				uid: bindObj.uid,
				obj: dialog
			};
		},
		/**
		 * 解绑事件
		 * @param {String} target 触发目标
		 * @param {Number} count 要解绑事件的uid
		 * @return {Object} null
		 */
		off: function (targets, count) {
			var self = this;
			var box  = document.getElementById(targets) || document.getElementsByClassName(targets)[0];
			var c;

			this.binds.forEach(function (i, index) {
				if (i.uid === count) {
					c = index;
				}
			});

			box.removeEventListener('click', this.binds[c].fn);
			console.log('%c Unbind event success!', 'color: #ff5f00;');
		},
		/**
		 * 增加事件
		 * @param {String} name 事件名称, 具有唯一性
		 * @param {Function} fn 事件方法
		 * @param {Function} callback 添加事件后回调方法
		 * @return {Object} null
		 */
		add: function (name, fn, callback) {
			var isHad = false;
			callback          = callback || function () {};
			for (var i in this.dialogs) {
				if (name === this.dialogs.name) {
					console.warn(name + ' had been subscribed!');
					isHad = true;
					return;
				}
			}

			if (!isHad) {
				var obj = {
					name: name,
					fn  : fn
				}
				this.dialogs.push(obj);

				var result = {
					state: 'success',
					obj: this.dialogs
				}

				callback(result);
			} else {
				callback('Had been subscribed name.');
			}
		},
		/**
		 * 删除事件
		 * @param {String} name 事件名称, 具有唯一性
		 * @param {Function} callback 删除事件后回调方法
		 * @return {Object} null
		 */
		del: function (name, callback) {
			callback     = callback || function () {};
			this.dialogs = this.dialogs.filter(
	            function(el) {
	                if (el.name !== name) {
	                    return el;
	                }
	            }
	        );
	        var result   = {
	        	state: 'success',
	        	obj: this.dialogs
	        }

			callback(result, this.dialogs);
		}
	}

	window.EdgeDialog = EdgeDialog;

}) (window, document);