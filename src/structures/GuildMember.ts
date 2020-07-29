import { User } from "./User.ts";
import { Guild } from "./Guild.ts";

/** Class representing a guild member */
export class GuildMember {
	public user: User;
	public nick!: string;
	public roles: Array<string>; // TODO(fox-cat): role objects
	public joinedAt: string;
	public premiumSince!: string;
	public deaf: boolean;
	public mute: boolean;

	constructor(data: any, public guild: Guild) {
		this.user = new User(data.user);
		this.nick = data.nick || null;
		this.roles = data.roles;
		this.joinedAt = data.joinedAt;
		this.premiumSince = data.premiumSince || null;
		this.deaf = data.deaf;
		this.mute = data.mute;
	}
}
