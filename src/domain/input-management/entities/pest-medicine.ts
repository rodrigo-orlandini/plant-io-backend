import { Entity } from "../../../@shared/entity";
import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";
import { CropCategory } from "../value-objects/crop-category";
import { PestCategory } from "../value-objects/pest-category";

// Remédio de pragas
export interface PestMedicineProps {
  // Nome do remédio
  name: string;
  // Categoria de cultura aplicáveis
  applicableCropCategory?: CropCategory;
  // Categoria de pragas aplicáveis
  applicablePestCategory: PestCategory;
}

export class PestMedicine extends Entity<PestMedicineProps> {
  constructor(props: PestMedicineProps, id?: string) {
    const validate = PestMedicine.isValid(props);
    if (!validate.success) {
      throw new InvalidEntityCreationError(
        "PestMedicine", validate.field, props[validate.field], id
      );
    }

    super(props, id);
  }

  private static isValid({ 
    name, applicableCropCategory, applicablePestCategory 
  }: PestMedicineProps): ValidationFunctionReturn<PestMedicineProps> {
    // Nome deve ter no mínimo 1 caractere
    if (name.trim().length === 0) {
      return { success: false, field: "name" };
    }

    // Se a cultura aplicável foi enviada, ela deve ter no mínimo 1 caractere
    if (applicableCropCategory !== undefined && !CropCategory.isValid(applicableCropCategory.toString())) {
      return { success: false, field: "applicableCropCategory" };
    }

    if (!PestCategory.isValid(applicablePestCategory.toString())) {
      return { success: false, field: "applicablePestCategory" };
    }

    return { success: true };
  }

  public get name(): string {
    return this.props.name;
  }

  public get applicablePestCategory(): PestCategory {
    return this.props.applicablePestCategory;
  }

  public get applicableCropCategory(): CropCategory | undefined {
    return this.props.applicableCropCategory;
  }
}