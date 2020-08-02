import { Guild } from "./Guild.ts";
import { DMChannel } from "./DMChannel.ts";

export interface Guilds {
  getGuild(id: string): Guild | undefined;
}

export interface GuildChannelAssociation {
  getGuildId(channelId: string): string | undefined;
  setGuildId(channelId: string, guildId: string): void;
}

export interface DMChannels {
  getDMChannel(id: string): DMChannel | undefined;
}
