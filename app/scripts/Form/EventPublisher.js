/**
 * Class representing a publisher element
 * that broadcast events to all of its subscribers.
 * The class can broadcast many event types.
 */
export default class EventPublisher {
  /**
   * Constructing the EventPublisher.
   */
  constructor() {
    this.subscribers = {
      any: [],
    };
  }

  /**
   * Adding a new subscriber to the list of subscribers.
   * @param {string} type Type of event the subscriber reacts to.
   * @param {function} fn Callback function called when the event fires.
   */
  subscribe(type, fn) {
    type = type || 'any';

    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }

    this.subscribers[type].push(fn);
  }

  /**
   * Calling every subscriber that subscribes given type.
   * @param {string} type Type of the event to be broadcasted.
   * @param {function} arg Arguments to pass to subscribers.
   */
  publish(type, arg) {
    type = type || 'any';

    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }

    this.subscribers[type].forEach((s) => s(arg));
  }
}
