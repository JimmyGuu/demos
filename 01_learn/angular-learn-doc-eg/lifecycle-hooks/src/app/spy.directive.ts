import { Directive, OnInit, OnDestroy } from '@angular/core';

import { LoggerService } from './logger.service';

let nextId = 1;

@Directive({
    selector: '[mySpy]'
})

export class SpyDirective implements OnInit, OnDestroy {
    constructor(private logger: LoggerService) {}

    ngOnInit() {
        this.logIt(`onInit`);
    }

    ngOnDestroy() {
        this.logIt(`onDestroy`);
    }

    private logIt(msg: string) {
        this.logger.log(`Spy #${nextId++} ${msg}`);
    }
}
