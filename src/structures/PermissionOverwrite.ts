export class PermissionOverwrite {
  public readonly type: string;
  public readonly id: string;
  public readonly deny_new: string;
  public readonly deny: number;
  public readonly allow_new: string;
  public readonly allow: number;

  constructor(data: any) {
    //this = {this, ...data};
    this.type = data.type;
    this.id = data.id;
    this.deny_new = data.deny_new;
    this.deny = data.deny;
    this.allow_new = data.allow_new;
    this.allow = data.allow;
  }
}
