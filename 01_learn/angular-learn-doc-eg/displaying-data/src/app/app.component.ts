import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';

@Component({
	// 自定义标签的名称
	selector: 'app-root',
	// template 属性定义内联模板
	// templateUrl 属性定义外链模板
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	// 变量赋值的方式初始化组件
	// title = 'Tour of Heroes';
	// myHero = 'Vencent';
	title: string;
	myHero: Hero;
	// heroes = ['Windstorm', 'Vencent', 'Bombasto', 'Magneta', 'Tornado',]
	heroes = [
		new Hero(1, 'Windstorm'),
		new Hero(2, 'Vencent'),
		new Hero(3, 'Bombasto'),
		new Hero(4, 'Magneta'),
		new Hero(5, 'Tornado')
	];
	// 上下文命名冲突测试
	hero = this.heroes[0];

	// 返回指定长度数组
	range(n) {
		return new Array(n);
	}

	// 构造函数来声明和初始化属性
	constructor() {
		this.title = 'Tour of Heroes';
		this.myHero = this.heroes[1];
	}

	inputAttr: string;
	inputVal: string;
	getInputAttr() {
		let input = document.querySelector('input[name="test-input"]');
		let attr = input.getAttribute('value');
		this.inputAttr = attr;
	}

	titles: string = '<code>TITLE</code>';

	scripts: string = '<script>alert("evil never sleeps")</script>';
	// @console WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss).

	badCurly: string = 'bad-curly';
	isSpecial: boolean = true;

	currentHero: Hero;
	getCurrentHero() {
		this.currentHero = this.heroes[0]; // 假设 this.heroes = [new Hero(1, 'Windstorm')]
	}


	fontSizePx: number = 12;

	ngOnInit(): void {
		this.getCurrentHero();
	}
}
