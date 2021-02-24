import {debounce} from 'rxjs/operators';
import {fromEvent, interval} from 'rxjs';

/**
 * Class responsible for holding a button
 * and broadcasting the click events to every subscriber.
 */
export default class BaconButton {
  /**
   * Constructing the BaconButton.
   * Initializing an empty list for subscribers of a button click event.
   * @param {HTMLElement} button Button element.
   */
  constructor(button) {
    this.button = button;
    this.subscribers = [];

    this.publishButtonEvents();
  }

  /**
   * Running subscriber functions when the button is clicked.
   * Debouncing the click event.
   */
  publishButtonEvents() {
    fromEvent(this.button, 'click')
      .pipe(debounce(() => interval(150)))
      .subscribe((_) => {
        this.subscribers.forEach((s) => s());
      });
  }

  /**
   * Adding a new subscriber who will be listening for click events.
   * @param {function} subscriber - Subscriber function. Will be
   *    called every time the button is clicked. The function
   *    does not take any arguments.
   */
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
