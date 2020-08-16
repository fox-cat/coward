import type * as events from "../Events.ts";

export type EventsKey = keyof typeof events;
export type EventValue<K extends EventsKey> = typeof events[K];
export type EventsEntry = [EventValue<EventsKey>, EventsListener<EventsKey>];

export type EventsEmitterEvent<K extends EventsKey> = EventValue<K> extends
  Emitter<infer E> ? E : {};

export type Events = {
  [K in EventsKey]: EventValue<K>;
};

export type EventsListener<K extends EventsKey> = Listener<
  EventsEmitterEvent<K>
>;

export type EventsListeners = {
  [K in EventsKey]?: EventsListener<K>;
};

export interface Listener<T> {
  (event: T): any;
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
