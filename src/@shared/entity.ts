import { Id } from "./id";

export class Entity<T> {
  private _id: Id;
  private _props: T;

  constructor(props: T, id?: string) {
    this._id = new Id(id);
    this._props = props;
  }

  public get id(): string {
    return this._id.toString();
  }

  protected get props(): T {
    return this._props;
  }
}