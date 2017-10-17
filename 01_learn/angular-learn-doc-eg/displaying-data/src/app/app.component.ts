import { Component } from '@angular/core';

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
	myHero: string;
	Heroes = ['Windstorm', 'Vencent', 'Bombasto', 'Magneta', 'Tornado',]

	// 构造函数来声明和初始化属性
	constructor() {
		this.title = 'Tour of Heroes';
		this.myHero = this.Heroes[1];
	}
}
