/**
 * Storage Factoru
 */
StorageUtilManager: new Object ({
	createStorageUtil: function () {
		if (window.applicationCache) {
			return AppUtil.LocalStorageUtil;
		} else {
			return AppUtil.CookieStorageUtil;
		}
	}
})

/**
 * implement Storage
 * write()
 * get()
 */
CookieStorageUtil: {
	write: function (key, dataObj) {
		this._clearCookie(key);
		// 写入的字符串
		var dataObjStr = JSON.stringify(dataObj);
		this._setCookie(key, dataObjStr, 15);
	},
	get: function (key) {
		return this._getCookie(key);
	},
	_setCookie: function (cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = 'expires=' + d.toUTCString();
		var path = 'path=/';
		document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + path;
	},
	_getCookie: function (cname) {
		var name = cname + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		}
		return null;
	},
	_clearCookie: function (key) {
		this._setCookie(key, '', -1);
	}
}

/**
 * implement Storage
 * write()
 * get()
 */
LocalStorageUtil: {
	write: function (key, dataObj) {
		this._writeLocalStorage(key, dataObj);
	},
	get: function (key) {
		return this._getFromLocalStorage(key);
	},
	_writeLocalStorage: function (key, dataObj) {
		var localStorage = window.localStorage;
		localStorage.removeItem(key);
		// 对象转化为 字符串，将objStr按正常方式存入localStorage中
		var dataObjStr = JSON.stringify(dataObjStr);
		localStorage.setItem(key, dataObjStr);
	},
	_getFromLocalStorage: function (key) {
		var localStorage = window.localStorage;
		return localStorage.getItem(key);
	},
	_removeLocalStorage: function (key) {
		var localStorage = window.localStorage;
		localStorage.removeItem(key);
	}
}