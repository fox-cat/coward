import { Client } from "../Client.ts";

import { 
	GuildTextChannel,
	DMChannel,
	GuildVoiceChannel,
	GuildChannelCategory,
	GuildNewsChannel,
	GuildStoreChannel,
	PermissionOverwrite
} from "../../mod.ts" 
// This doesn't work unless I import them all from here.

/** Class representing a channel */
export class Channel {
	public id: string;
	public type: number;
	public permission_overwrites: Map<string, PermissionOverwrite>;

	constructor(data: any, protected client: Client) {
		this.id = data.id;
		this.type = data.type;

		this.permission_overwrites = new Map<string, PermissionOverwrite>();
		for(let permission_overwrite of data.permission_overwrites) {
			let perms = new PermissionOverwrite(permission_overwrite, client);
			this.permission_overwrites.set(perms.id, perms);
		}

	}

	static from(data: any, client: Client) {
		switch(data.type) {
			case 0:
				return new GuildTextChannel(data, client)
				break
			case 1:
				return new DMChannel(data, client)
				break
			case 2:
				return new GuildVoiceChannel(data, client)
				break
			case 4:
				return new GuildChannelCategory(data, client)
				break
			case 5:
				return new GuildNewsChannel(data, client)
				break
			case 6:
				return new GuildStoreChannel(data, client)
				break
			default:
				return new Channel(data, client)
				break
		}
	}
}
