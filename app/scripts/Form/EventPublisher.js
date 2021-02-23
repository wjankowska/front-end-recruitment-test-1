export default class EventPublisher {
  constructor() {
    this.subscribers = {
      any: []
    }
  }

  subscribe(type, fn) {
    type = type || 'any';

    if (typeof this.subscribers[type] === "undefined") {
      this.subscribers[type] = [];
    }

    this.subscribers[type].push(fn);
  }

  publish(type, arg) {
    type = type || 'any';

    if (typeof this.subscribers[type] === "undefined") {
      this.subscribers[type] = [];
    }

    this.subscribers[type].forEach(s => s(arg))
  }
}