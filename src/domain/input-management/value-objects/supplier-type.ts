import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";

export enum SupplierTypeEnum {
  // Sementes
  CROP = "CROP",
  // Adubos
  FERTILIZER = "FERTILIZER",
  // Remédios de pragas
  PEST_MEDICINE = "PEST_MEDICINE"
}

export class SupplierType {
  private readonly value: SupplierTypeEnum;

  constructor(value: string) {
    const validate = SupplierType.isValid(value);
    if (!validate) {
      throw new InvalidEntityCreationError(
        "SupplierType", "value", value
      );
    }

    this.value = value as SupplierTypeEnum;
  }

  public static isValid(value: string): boolean {
    return Object.values(SupplierTypeEnum).includes(value as SupplierTypeEnum);
  }

  public toString(): string {
    return this.value;
  }
}