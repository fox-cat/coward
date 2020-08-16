import { Emitter, Listener } from "./util/Emitter.ts";

import type { Channel } from "./structures/Channel.ts";
import type { Guild } from "./structures/Guild.ts";
import type { GuildMember } from "./structures/GuildMember.ts";
import type { GuildEmoji } from "./structures/GuildEmoji.ts";
import type { ReactionCustomEmoji } from "./structures/ReactionCustomEmoji.ts";
import type { ReactionStandardEmoji } from "./structures/ReactionStandardEmoji.ts";
import type { Message } from "./structures/Message.ts";
import type { User } from "./structures/User.ts";
import type { Role } from "./structures/Role.ts";

export type EventsKey = keyof Events;
export type EventsValue<K extends EventsKey> = Events[K];

export type EventsPayload<K extends EventsKey> = EventsValue<K> extends
  Emitter<infer E> ? E : never;

export type EventsListener<K extends EventsKey> = Listener<EventsPayload<K>>;
export type EventsListeners = {
  [K in EventsKey]: EventsListener<K>;
};

/** Events contains all events in coward. */
// TODO: split events by intents.
export class Events {
  /** Fired when the client is ready. */
  readonly ready = new Emitter();

  /** Fired when a channel is created. */
  readonly channelCreate: Emitter<{ channel: Channel }> = new Emitter<
    { channel: Channel }
  >();

  /** Fired when a channel is updated. */
  readonly channelUpdate: Emitter<{ channel: Channel }> = new Emitter<
    { channel: Channel }
  >();

  /** Fired when a channel is deleted. */
  readonly channelDelete: Emitter<{ channel: Channel }> = new Emitter<
    { channel: Channel }
  >();

  /** Fired when a message is pinned or unpinned in a text channel. This is not fired when a pinned message is deleted. */
  readonly channelPinsUpdate: Emitter<{ channel: Channel }> = new Emitter<
    { channel: Channel }
  >();

  /**
   * Fired when
   * - The client is initally connecting.
   * - A guild becomes available to the client.
   * - The client joins a guild.
   */
  readonly guildCreate: Emitter<{ guild: Guild }> = new Emitter<
    { guild: Guild }
  >();

  /** Fired when a guild is updated. */
  readonly guildUpdate = new Emitter<{ guild: Guild }>();

  /**
   * Fired when
   * - The client leaves or is removed from a guild.
   * - A guild becomes unavailable.
   */
  readonly guildDelete: Emitter<{ guild: Guild }> = new Emitter<
    { guild: Guild }
  >();

  /** Fired when a user is banned from a guild. */
  readonly guildBanAdd: Emitter<{ guild: Guild; user: User }> = new Emitter<
    { guild: Guild; user: User }
  >();

  /** Fired when a user is unbanned from a guild. */
  readonly guildBanRemove: Emitter<{ guild: Guild; user: User }> = new Emitter<
    { guild: Guild; user: User }
  >();

  /** Fired when a guild's emojis have been updated. */
  readonly guildEmojisUpdate: Emitter<
    { guild: Guild; emojis: Array<GuildEmoji> }
  > = new Emitter<{ guild: Guild; emojis: Array<GuildEmoji> }>();

  /** Fired when a guild's integrations are updated. */
  readonly guildIntegrationsUpdate: Emitter<{ guild: Guild }> = new Emitter<
    { guild: Guild }
  >();

  /** Fired when a new user joins a guild. */
  readonly guildMemberAdd: Emitter<{ guild: Guild; member: GuildMember }> =
    new Emitter<{ guild: Guild; member: GuildMember }>();

  /** Fired when a user leaves or is removed from a guild. */
  readonly guildMemberRemove: Emitter<{ guild: Guild; member: GuildMember }> =
    new Emitter<{ guild: Guild; member: GuildMember }>();

  /** Fired when a guild member is updated. */
  //TODO: Is there a better way of doing this? :v
  readonly guildMemberUpdate: Emitter<
    { guild: Guild; member: GuildMember; oldMember: GuildMember }
  > = new Emitter<
    { guild: Guild; member: GuildMember; oldMember: GuildMember }
  >();

  //TODO: EmitterGuildMemberChunk: https://discord.com/developers/docs/topics/gateway#guild-members-chunk

  /** Fired when a guild role is created. */
  readonly guildRoleCreate: Emitter<{ guild: Guild; role: Role }> = new Emitter<
    { guild: Guild; role: Role }
  >();

  /** Fired when a guild role is updated. */
  readonly guildRoleUpdate: Emitter<{ guild: Guild; role: Role }> = new Emitter<
    { guild: Guild; role: Role }
  >();

  /** Fired when a guild role is deleted. */
  readonly guildRoleDelete: Emitter<{ guild: Guild; role: Role }> = new Emitter<
    { guild: Guild; role: Role }
  >();

  // TODO: Invites (see https://discord.com/developers/docs/topics/gateway#invites)

  /** Fired when a message is created. */
  readonly messageCreate: Emitter<{ message: Message }> = new Emitter<
    { message: Message }
  >();

  /** Fired when a message is updated. */
  readonly messageUpdate: Emitter<{ message: Message }> = new Emitter<
    { message: Message }
  >();

  /** Fired when a message is deleted. */
  readonly messageDelete: Emitter<{ messageID: string; channelID: string }> =
    new Emitter<{ messageID: string; channelID: string }>();

  /** Fired when messages are deleted in bulk. */
  readonly messageDeleteBulk: Emitter<
    { messageIDs: Array<string>; channelID: string }
  > = new Emitter<{ messageIDs: Array<string>; channelID: string }>();

  /** TODO: Fired when a reaction is added to a message. */
  readonly messageReactionAdd: Emitter<
    {
      user: User;
      channel: Channel;
      emoji: ReactionStandardEmoji | ReactionCustomEmoji;
      messageID: string;
    }
  > = new Emitter<
    {
      user: User;
      channel: Channel;
      emoji: ReactionStandardEmoji | ReactionCustomEmoji;
      messageID: string;
    }
  >();

  /** TODO: Fired when a reaction is removed from a message. */
  readonly messageReactionRemove: Emitter<
    {
      user: User;
      channel: Channel;
      emoji: ReactionStandardEmoji | ReactionCustomEmoji;
      messageID: string;
    }
  > = new Emitter<
    {
      user: User;
      channel: Channel;
      emoji: ReactionStandardEmoji | ReactionCustomEmoji;
      messageID: string;
    }
  >();

  /** TODO: Fired when a user removes all reactions from a message. */
  readonly messageReactionRemoveAll: Emitter<
    { channel: Channel; messageID: string }
  > = new Emitter<{ channel: Channel; messageID: string }>();

  // TODO: Presence ...https://discord.com/developers/docs/topics/gateway#presence-update

  /** Fired when a user starts typing in a channel. */
  readonly typingStart: Emitter<
    { channel: Channel; userID: string; timestamp: number }
  > = new Emitter<{ channel: Channel; userID: string; timestamp: number }>();

  // TODO: Voice ...https://discord.com/developers/docs/topics/gateway#voice
}
