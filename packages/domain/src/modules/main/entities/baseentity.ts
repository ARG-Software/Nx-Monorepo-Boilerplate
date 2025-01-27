/* eslint-disable @typescript-eslint/ban-ts-comment */
export abstract class MainBaseEntity {
  // @ts-ignore
  public id: string;
  public createdAt: string;
  public modifiedAt: string;

  constructor() {
    this.createdAt = new Date().toISOString();
    this.modifiedAt = new Date().toISOString();
  }
}
