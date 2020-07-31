import { Client } from "../Client.ts";
import { User } from "./User.ts";
import { TextChannelMixIn } from "./TextChannel.ts";
import { Channel } from "./Channel.ts";

/**
 * Class representing a DM channel
 * @extends Channel
 */
export class DMChannel extends TextChannelMixIn(Channel) {
  public recipients: Array<User>;

  constructor(data: any, client: Client) {
    super(data, client);

    this.recipients = Object.values(data.recipients).map((recipient) =>
      new User(recipient)
    );
  }
}
