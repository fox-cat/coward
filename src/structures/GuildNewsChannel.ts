import {
  GuildChannel,
  GuildChannelClient,
  GuildChannelHandler,
} from "./GuildChannel.ts";
import { TextChannelMixIn } from "./TextChannel.ts";

/**
 * Class representing a news channel in a guild
 * @extends GuildChannel
 */
export class GuildNewsChannel extends TextChannelMixIn(GuildChannel) {
  public readonly topic: string;
  public readonly lastMessageID: string; // TODO(fox-cat): contemplate message object here?

  constructor(
    data: any,
    client: GuildChannelClient,
    handler: GuildChannelHandler,
  ) {
    super(data, client, handler);

    this.topic = data.topic || null;
    this.lastMessageID = data.last_message_id || null;
  }
}
