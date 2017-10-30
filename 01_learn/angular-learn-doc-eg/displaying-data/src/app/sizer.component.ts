import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-sizer',
	templateUrl: './sizer.component.html'
})

export class SizerComponent {
	@Input() size: number | string;
	@Output() sizeChange = new EventEmitter<number>();

	dec() { this.resize(-1); }
	inc() { this.resize(+1); }

	resize(delta: number) {
		console.log(delta, +this.size)
		this.size = Math.min(40, Math.max(8, +this.size + delta));
		console.log(this.size)
		this.sizeChange.emit(this.size);
	}
}