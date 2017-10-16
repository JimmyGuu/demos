import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './component/hero-detail.component';
import { HeroesComponent } from './component/heroes.component';
import { DashboardComponent } from './component/dashboard.component';
import { HeroSearchComponent } from './component/hero-search.component';
import { HeroService } from './service/hero.service';

import { AppRoutingModule } from './app-routing.module';

// 模拟服务(内存Web API)
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './data/in-memory-data.service';

@NgModule({
	declarations: [
		AppComponent,
		HeroDetailComponent,
		HeroesComponent,
		DashboardComponent,
		HeroSearchComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpModule,
		InMemoryWebApiModule.forRoot(InMemoryDataService)
	],
	providers: [
		HeroService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
