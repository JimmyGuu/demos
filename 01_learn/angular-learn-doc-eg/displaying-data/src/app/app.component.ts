import { Component } from '@angular/core';
import { Hero } from './hero';

@Component({
	// 自定义标签的名称
	selector: 'app-root',
	// template 属性定义内联模板
	// templateUrl 属性定义外链模板
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
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

	// 构造函数来声明和初始化属性
	constructor() {
		this.title = 'Tour of Heroes';
		this.myHero = this.heroes[1];
	}
}
