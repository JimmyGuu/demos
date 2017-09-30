; (function (window, document) {
	// 目前所有验证功能
	var list = [
		{ name: '验证是否被整除', type: 'divisible', typeNo: 1, extendParams: { multiple: '被整除的数' } }
	];

	// 验证是否被整除
	var Divisible = function (number, params) {
		this.success = false;
		if (params.multiple) {
			if (number % parseFloat(params.multiple) === 0) {
				this.success = true;
			}
		} else {
			var msg = { message: 'divisible.multiple is necessary.' }
			new ErrorHandler(msg);
		}
	}

	// 错误处理
	var ErrorHandler = function (error) {
		var msg = error.message || error;
		console.warn(msg);
		return;
	}

	// 构造函数
	function ValidateNumber(json) {
		if (this instanceof ValidateNumber) {
			this.author = 'Jehorn';
			this.version = '0.0.1';

			this.type = json.type;
			this.number = json.number || json.num;
			this.divisible = json.divisible || { multiple: 100 }
			this.compare = json.compare || { isEqual: true }

			this.validate();
		} else {
			return new ValidateNumber(json);
		}
	}

	// 显示当前内置功能
	ValidateNumber.prototype.list = function () {
		list.forEach(function (i, index) {
			console.log('%c 验证描述: ' + i.name + ', 验证传参1: ' + i.type + ', 验证传参2: ' + i.typeNo + ', 附加参数: ' , 'color: #ff5f00;font-size: 14px;');
			console.log(i.extendParams);
		});
	}

	// 验证
	ValidateNumber.prototype.validate = function () {
		var validation;
		var type = this.type;
		var number = parseFloat(this.number);

		if (!type) {
			var msg = { message: 'type is error.' }
			new ErrorHandler(msg);
		}

		if (!number) {
			var msg = { message: 'number is error.' }
			new ErrorHandler(msg);
		}

		if (typeof type === 'string') {
			type = type.toString().toLowerCase();
		}

		if (type === 'divisible' || type == 1) {
			if (this.divisible) {
				validation = new Divisible(number, this.divisible);
			} else {
				var msg = { message: 'divisible is necessary.' }
				new ErrorHandler(msg);
			}
		}

		validation.result = function () {
			return this.success;
		}

		this.success = validation.result();
	}


	window.validateNumber = ValidateNumber;

})(window, document);
