import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";

export enum CropStatusEnum {
  // Semente
  SEED = "SEED",
  // Colhido
  HARVEST = "HARVEST"
}

export class CropStatus {
  private readonly value: CropStatusEnum;

  constructor(value: string) {
    const validate = CropStatus.isValid(value);
    if (!validate) {
      throw new InvalidEntityCreationError(
        "CropStatus", "value", value
      );
    }

    this.value = value as CropStatusEnum;
  }

  public static isValid(value: string): boolean {
    return Object.values(CropStatusEnum).includes(value as CropStatusEnum);
  }

  public toString(): string {
    return this.value;
  }
}