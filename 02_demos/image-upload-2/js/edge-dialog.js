/**
 * EdgeDialog
 * Description A dialog box pops up from the edge
 * Author      Jehorn
 * Version     0.0.1
 * @param  {Object} window     The object of window
 * @param  {Object} document   The object of document
 * @return {Object} EdgeDialog The EdgeDialog bind to window
 */
;(function (window, document) {
	// 同一实例下绑定多事件计数器
	var count  = 0;

	// Create DOM.
	var create = function (targets) {
		var body        = document.body;
		var container   = document.createElement('div');
		var mask        = document.createElement('div');
		var isContainer = document.getElementById('edgeDialogContainer');
		var isMask      = document.getElementById('edgeDialogMask');

		container.style.cssText = 'display: none;position: absolute;background-color: #fff;color: #000;transition: all .3s ease-out;';
		container.id            = 'edgeDialogContainer';

		mask.style.cssText = 'display: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, .5);transition: all .3s ease-out;';
		mask.id            = 'edgeDialogMask';

		isContainer ? '' : mask.appendChild(container);
		isMask ? '' : body.appendChild(mask);

		return {
			body: body,
			container: container,
			mask: mask
		}
	}

	// Internal types.
	var BottomDialog = function (create, opts) {
		this.create = function () {
			var doms  = create();
			var speed = opts.speed || 300;

			doms.container.style.width   = opts.width || '100%';
			doms.container.style.height  = opts.height || 'auto';
			doms.container.style.padding = opts.padding || '15px';
			doms.container.style.bottom  = opts.bottom || '-100%';
			doms.container.style.left    = opts.left || '0';

			doms.mask.style.display = 'block';
			window.setTimeout(function () {
				doms.container.style.display = 'block';
				doms.container.style.bottom = '0';
			}, speed);

			console.log('cerated');
		}
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
		on: function (targets, type, callback, args) {
			callback    = callback || function () {};
			var self    = this;
			var box     = document.getElementById(targets) || document.getElementsByClassName(targets)[0];
			var dialog  = createDialog(this, targets, type, args);
			var bindObj = {
				uid: count,
				fn: function () {
					dialog.create ? dialog.create() : console.log('%c Get none create method!', 'color: #ddd;');
					callback(dialog, bindObj.uid);
				}
			};

			this.binds.push(bindObj);

			box.addEventListener('click', this.binds[count].fn);

			count++;

			return bindObj.uid;
		},
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
			console.log('Unbind event success!');
		},
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