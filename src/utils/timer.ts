export default class Timer {
  timeout: number|undefined;

  start: number;

  remaining: number;

  callback: (...args: any) => any;

  constructor(callback: (...args: any) => any, delay: number) {
    this.timeout = setTimeout(callback, delay);
    this.start = Date.now();
    this.remaining = delay;
    this.callback = callback;
  }

  resume = () => {
    this.start = Date.now();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.callback, this.remaining);
  };

  pause = () => {
    clearTimeout(this.timeout);
    this.remaining -= Date.now() - this.start;
  };
}
