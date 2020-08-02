import {
  GuildChannel,
  GuildChannelClient,
  GuildChannelHandler,
} from "./GuildChannel.ts";

/**
 * Class representing a voice channel in a guild
 * @extends GuildChannel
 */
export class GuildVoiceChannel extends GuildChannel {
  public bitrate: number;
  public userLimit: number;

  constructor(
    data: any,
    client: GuildChannelClient,
    handler: GuildChannelHandler,
  ) {
    super(data, client, handler);

    this.bitrate = data.bitrate;
    this.userLimit = data.user_limit;
  }
}
