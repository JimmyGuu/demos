import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SizerComponent } from './sizer.component';
import { NgForTrack } from './ng-for-track.component';

@NgModule({
	declarations: [
		AppComponent,
		SizerComponent,
		NgForTrack
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
