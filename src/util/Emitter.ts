export interface Listener<T extends object> {
  (event: T): void;
}

export class Emitter<T extends object = {}> {
  private readonly listeners: Listener<T>[] = [];

  on = (listener: Listener<T>) => {
    this.listeners.push(listener);
  };
  emit = (event: T) => {
    this.listeners.forEach((listener) => listener(event));
  };
}
