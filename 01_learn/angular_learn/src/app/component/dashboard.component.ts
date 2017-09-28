import { Component, OnInit } from '@angular/core';

import { Hero } from '../model/hero';
import { HeroService } from '../service/hero.service';


@Component({
	selector: 'my-dashboard',
	templateUrl: '../template/dashboard.component.html',
	styleUrls: ['../css/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	// 创建一个数组
	heroes: Hero[] = [];

	// 在构造函数注入 HeroService 保存在私有变量
	constructor(private heroService: HeroService) { }

	// 在 Angular 的 ngOnInit 生命周期钩子里面调用服务
	ngOnInit(): void {
		this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
	}
}