import { RoleEventSubscriber, handleRoleEvent } from "./guild/Role.ts";
import { MemberEventSubscriber, handleMemberEvent } from "./guild/Member.ts";
import { Client } from "../../../../Client.ts";
import { GuildDB } from "../../Event.ts";
import { Payload } from "../../Payload.ts";
import { Guild } from "../../../../structures/Guild.ts";
import { User } from "../../../../structures/User.ts";
import { Emitter } from "../../../../util/Emitter.ts";
import { GuildEmoji } from "../../../../structures/GuildEmoji.ts";

export interface GuildEventSubscriber
  extends RoleEventSubscriber, MemberEventSubscriber {
  guildCreate: Emitter<{ type: "GUILD_CREATE"; guild: Guild }>;
  guildDelete: Emitter<{ type: "GUILD_DELETE"; guild: Guild }>;
  guildBanAdd: Emitter<{ type: "GUILD_BAN_ADD"; guild: Guild; user: User }>;
  guildBanRemove: Emitter<
    { type: "GUILD_BAN_REMOVE"; guild: Guild; user: User }
  >;
  guildEmojisUpdate: Emitter<
    { type: "GUILD_EMOJIS_UPDATE"; guild: Guild; emojis: Array<GuildEmoji> }
  >;
  guildIntegrationsUpdate: Emitter<
    { type: "GUILD_INTEGRATIONS_UPDATE"; guild: Guild }
  >;
}

export function handleGuildEvent(
  client: Client,
  message: Payload,
  subscriber: GuildEventSubscriber,
  database: GuildDB,
) {
  if (message.t.startsWith("GUILD_MEMBER_")) {
    handleMemberEvent(message, subscriber, database);
    return;
  }
  if (message.t.startsWith("GUILD_ROLE_")) {
    handleRoleEvent(client, message, subscriber, database);
    return;
  }
  const type = message.t;
  switch (type) {
    case "GUILD_CREATE": {
      const guild = new Guild(message.d, client);
      database.setGuild(guild.id, guild);
      subscriber.guildCreate.emit({ type, guild: guild });
      return;
    }
    case "GUILD_DELETE": {
      const guild = new Guild(message.d, client);
      database.deleteGuild(guild.id);
      subscriber.guildDelete.emit({ type, guild: guild });
      return;
    }
    case "GUILD_BAN_ADD": {
      const data = message.d as { guild_id: string; user: User };
      const guild = database.getGuild(data.guild_id);
      if (guild == null) return;
      subscriber.guildBanAdd.emit(
        { type, guild: guild, user: data.user },
      );
      return;
    }
    case "GUILD_BAN_REMOVE": {
      const data = message.d as { guild_id: string; user: User };
      const guild = database.getGuild(data.guild_id);
      if (guild == null) return;
      subscriber.guildBanRemove.emit(
        { type, guild: guild, user: data.user },
      );
      return;
    }
    case "GUILD_EMOJIS_UPDATE": {
      const data = message.d as { guild_id: string; emojis: unknown[] };
      const guild = database.getGuild(data.guild_id);
      if (guild == null) return;

      const emojis = new Array<GuildEmoji>(
        ...data.emojis.map((emoji) => new GuildEmoji(emoji, guild, client)),
      );
      subscriber.guildEmojisUpdate.emit({ type, guild: guild, emojis: emojis });
      return;
    }
    case "GUILD_INTEGRATIONS_UPDATE": {
      const data = message.d as { guild_id: string };
      const guild = database.getGuild(data.guild_id);
      if (guild == null) return;
      subscriber.guildIntegrationsUpdate.emit({ type, guild: guild });
      return;
    }
  }
}
