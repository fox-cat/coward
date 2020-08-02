import { Payload } from "../Payload.ts";
import { Emitter } from "../../../util/Emitter.ts";
import { handleChannelEvent, RoleEventSubscriber } from "./handler/Channel.ts";
import { handleGuildEvent, GuildEventSubscriber } from "./handler/Guild.ts";
import {
  handleMessageEvent,
  MessageEventSubscriber,
} from "./handler/Message.ts";
import { GuildDB, ChannelDB } from "../Event.ts";
import { GuildClient, GuildHandler } from "../../../structures/Guild.ts";
import { MessageClient } from "../../../structures/Message.ts";

export interface EventSubscriber
  extends RoleEventSubscriber, GuildEventSubscriber, MessageEventSubscriber {
  ready: Emitter<unknown>;
}

export function handleEvent(
  client: GuildClient & MessageClient,
  handler: GuildHandler,
  message: Payload,
  subscriber: EventSubscriber,
  database: GuildDB & ChannelDB,
) {
  const type = message.t;
  if (!type) return;

  if (type.startsWith("CHANNEL_")) {
    handleChannelEvent(
      message,
      subscriber,
      database,
      client,
      handler,
    );
    return;
  }
  if (type.startsWith("GUILD_")) {
    handleGuildEvent(
      client,
      handler,
      message,
      subscriber,
      database,
    );
    return;
  }
  if (type.startsWith("MESSAGE_")) {
    handleMessageEvent(client, message, subscriber);
    return;
  }
  switch (type) {
    case "READY": {
      subscriber.ready.emit({ type });
      return;
    }
      // TODO: invites
      // TODO: TYPING_START
  }
}
