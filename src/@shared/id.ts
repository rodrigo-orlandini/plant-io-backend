import { v4 as uuidv4 } from "uuid";

import { InvalidEntityCreationError } from "../error/invalid-entity-creation-error";

export class Id {
  private readonly value: string;

  constructor(uuid?: string) {
    if (!Id.isValid(uuid)) {
      throw new InvalidEntityCreationError("Id", "value", uuid ?? "");
    }

    this.value = uuid ?? uuidv4();
  }

  public toString(): string {
    return this.value;
  }

  private static isValid(value?: string): boolean {
    return value === undefined || (value !== undefined && value.trim().length !== 0);
  }
}