/** Class representing a standard reaction emoji */
export class ReactionStandardEmoji {
  public readonly id: string;
  public readonly name: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name || null;
  }
}
