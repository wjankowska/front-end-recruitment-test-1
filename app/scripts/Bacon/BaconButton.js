import {debounce} from 'rxjs/operators';
import {fromEvent, interval} from 'rxjs';

export default class BaconButton {
    constructor(button) {
        this.button = button;
        this.subscribers = [];

        this.publishButtonEvents();
    }

    publishButtonEvents() {
        fromEvent(this.button, 'click')
            .pipe(debounce(() => interval(150)))
            .subscribe(_ => {
                this.subscribers.forEach(s => s());
            });
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }
}