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

	// NgClass
	canSave: boolean = true;
	isUnchanged: boolean = false;
	currentClasses: {};
	setCurrentClasses() {
		this.currentClasses = {
			'saveable': this.canSave,
			'modified': !this.isUnchanged,
			'special': this.isSpecial
		}
	}

	// ngStyle
	currentStyles: {};
	setCurrentStyles() {
		this.currentStyles = {
			'font-style': this.canSave ? 'italic' : 'normal',
			'font-weight': !this.isUnchanged ? 'bold' : 'normal',
			'font-size': this.isSpecial ? '24px' : '12px'
		}
	}

	// ngModel
	setUppercaseName(name) {
		this.currentHero.name = name.toUpperCase();
	}

	// ngFor
	withTrackedCount: number = 0;
	withoutTrackedCount: number = 0;
	counts: number = 0;
	newHeroes: Array<Hero> = [];

	trackByHeroes(index: number, hero: Hero): number {
		return hero.id;
	}

	resetHeroes(): void {
		let oldHeores: Array<Hero> = [];
		this.newHeroes.forEach(hero => {
			oldHeores.push(hero);
		});
		this.newHeroes.length = 0;
		oldHeores.forEach((hero, index) => {
			this.counts++;
			let newHero: Hero = new Hero(hero.id, hero.name);
			this.newHeroes.push(newHero);
		});
	}
	changeIds(): void {
		this.newHeroes.length = 0;
		this.heroes.forEach((hero, index) => {
			this.counts++;
			let newHero: Hero = new Hero(+(this.counts + '' + (index + 1)), hero.name);
			this.newHeroes.push(newHero);
		});
	}
	clearCounts(): void {
		this.counts = 0;
		this.newHeroes.forEach((hero, index) => {
			let newHero: Hero = new Hero(+(this.counts + '' + index), hero.name);
			hero.id = newHero.id;
		});

		this.withTrackedCount = 0;
		this.withoutTrackedCount = 0;
	}

	ngOnInit(): void {
		this.getCurrentHero();

		// 初始化 currentClasses
		this.setCurrentClasses();

		// 初始化 CurrentStyles
		this.setCurrentStyles();

		// 初始化newHeroes
		this.heroes.forEach(hero => {
			this.newHeroes.push(hero);
		});
	}
}
