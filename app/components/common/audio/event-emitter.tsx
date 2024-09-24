type ListenersType = {
  [event: string]: Array<(...args: any[]) => void>;
};

export class EventEmitter {
  listeners: ListenersType = {};

  getCallbacksForEvent(event: string) {
    return this.listeners[event] ?? [];
  }

  setCallbacksForEvent(
    event: string,
    callbacks: Array<(...args: any[]) => void>,
  ) {
    if (callbacks.length === 0) {
      delete this.listeners[event];
    } else {
      this.listeners[event] = callbacks;
    }
  }

  subscribe(event: string, callback: (...args: any[]) => void) {
    const subscriptions = this.getCallbacksForEvent(event);
    subscriptions.push(callback);
    this.setCallbacksForEvent(event, subscriptions);
  }

  unsubscribe(event: string, callback: (...args: any[]) => void) {
    const subscriptions = this.getCallbacksForEvent(event).filter(
      (item) => item !== callback,
    );
    this.setCallbacksForEvent(event, subscriptions);
  }

  dispatch(event: string, ...args: any[]) {
    this.getCallbacksForEvent(event).forEach((callback) => callback(...args));
  }
}
