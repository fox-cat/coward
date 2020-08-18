import { Events } from "./Events.ts";
import type { Requester } from "./util/Requester.ts";
import { ActualRequester } from "./util/ActualRequester.ts";
import {
  Intents,
  IntentsKey,
  EventsByIntents,
  eventsByIntents,
} from "./structures/Intents.ts";

/**
 * Class representing the main client
 * @extends EventEmitter
 *
 *            import { Coward } from "https://deno.land/x/coward@v0.2.1/mod.ts"
 *            const client = new Coward("TOKEN_GOES_HERE")
 *
 *            client.events.ready.on(() => {
 *                console.log("READY")
 *            })
 *
 *            client.connect()
 */
export class Client<K extends IntentsKey> {
  private readonly requester: Requester;
  private connectionTask: Promise<void> | null = null;

  public readonly events = new Events();
  /** Events by specified intents  */
  public readonly eventsByIntents: EventsByIntents<K>;

  /** Create a Client */
  public constructor(
    public token: string,
    public options: { intents?: K[] } = {},
  ) {
    const intents = this.options.intents && new Intents(this.options.intents);
    this.requester = new ActualRequester({
      token,
      subscriber: this.events,
      intents: intents?.bitfield,
    });
    this.eventsByIntents = intents
      ? eventsByIntents(this.events, ...(intents.toArray() as K[]))
      : {} as EventsByIntents<K>;
  }

  /** Connect to the Discord API */
  connect() {
    this.connectionTask = this.requester.connect();
  }

  /** Disconnect to the Discord API */
  async disconnect() {
    await this.requester.disconnect();
    await this.connectionTask;
  }
}
