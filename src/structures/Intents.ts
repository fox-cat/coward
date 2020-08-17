import type { EventsKey, Events } from "../Events.ts";

/** 
 * A bit field expressing conditionally subscription on Discord API.
 * https://discord.com/developers/docs/topics/gateway#gateway-intents
 */
export const Intents = {
  GUILDS: 1 << 0,
  GUILD_MEMBERS: 1 << 1,
  GUILD_BANS: 1 << 2,
  GUILD_EMOJIS: 1 << 3,
  GUILD_INTEGRATIONS: 1 << 4,
  GUILD_WEBHOOKS: 1 << 5,
  GUILD_INVITES: 1 << 6,
  GUILD_VOICE_STATES: 1 << 7,
  GUILD_PRESENCES: 1 << 8,
  GUILD_MESSAGES: 1 << 9,
  GUILD_MESSAGE_REACTIONS: 1 << 10,
  GUILD_MESSAGE_TYPING: 1 << 11,
  DIRECT_MESSAGES: 1 << 12,
  DIRECT_MESSAGE_REACTIONS: 1 << 13,
  DIRECT_MESSAGE_TYPING: 1 << 14,
} as const;

// These commented out keys are not implemented now.
/** Store `EventsKey`s by the keys of `Intents`. */
export const EventKeysByIntents: Readonly<
  Record<keyof typeof Intents, Readonly<EventsKey[]>>
> = {
  GUILDS: [
    "guildCreate",
    "guildUpdate",
    "guildDelete",
    "guildRoleCreate",
    "guildRoleUpdate",
    "guildRoleDelete",
    "channelCreate",
    "channelUpdate",
    "channelDelete",
    "channelPinsUpdate",
  ],
  GUILD_MEMBERS: [
    "guildMemberAdd",
    "guildMemberUpdate",
    "guildMemberRemove",
  ],
  GUILD_BANS: [
    "guildBanAdd",
    "guildBanRemove",
  ],
  GUILD_EMOJIS: [
    "guildEmojisUpdate",
  ],
  GUILD_INTEGRATIONS: [
    "guildIntegrationsUpdate",
  ],
  GUILD_WEBHOOKS: [
    // "webhooksUpdate",
  ],
  GUILD_INVITES: [
    // "inviteCreate",
    // "inviteDelete",
  ],
  GUILD_VOICE_STATES: [
    // "voiceStateUpdate",
  ],
  GUILD_PRESENCES: [
    // "presenceUpdate",
  ],
  GUILD_MESSAGES: [
    "messageCreate",
    "messageUpdate",
    "messageDelete",
    "messageDeleteBulk",
  ],
  GUILD_MESSAGE_REACTIONS: [
    "messageReactionAdd",
    "messageReactionRemove",
    "messageReactionRemoveAll",
    // "messageReactionRemoveEmoji",
  ],
  GUILD_MESSAGE_TYPING: [
    "typingStart",
  ],
  DIRECT_MESSAGES: [
    "channelCreate",
    "messageCreate",
    "messageUpdate",
    "messageDelete",
    "channelPinsUpdate",
  ],
  DIRECT_MESSAGE_REACTIONS: [
    "messageReactionAdd",
    "messageReactionRemove",
    "messageReactionRemoveAll",
    // "messageReactionRemoveEmoji",
  ],
  DIRECT_MESSAGE_TYPING: [
    "typingStart",
  ],
};

function eventsByIntent(
  events: Events,
  key: keyof typeof Intents,
): Partial<Events> {
  const eventKeys = EventKeysByIntents[key];
  return eventKeys.reduce((acc, key) => ({
    ...acc,
    [key]: events[key],
  }), {});
}

/** Extract events from `events` by `keys` of Intents */
export function eventsByIntents(
  events: Events,
  ...keys: (keyof typeof Intents)[]
): Partial<Events>[] {
  return keys.map((key) => eventsByIntent(events, key));
}
