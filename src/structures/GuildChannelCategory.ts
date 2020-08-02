import {
  GuildChannel,
  GuildChannelClient,
  GuildChannelHandler,
} from "./GuildChannel.ts";

/**
 * Class representing a channel category in a guild
 * @extends GuildChannel
 */
export class GuildChannelCategory extends GuildChannel {
  constructor(
    data: any,
    client: GuildChannelClient,
    handler: GuildChannelHandler,
  ) {
    super(data, client, handler);
  }
}
