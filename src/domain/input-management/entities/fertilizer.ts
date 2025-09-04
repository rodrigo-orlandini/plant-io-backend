import { Entity } from "../../../@shared/entity";
import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";
import { CropCategory } from "../value-objects/crop-category";

// Adubo
export interface FertilizerProps {
  // Nome do adubo
  name: string;
  // Categoria de cultura aplicável
  applicableCropCategory?: CropCategory;
}

export class Fertilizer extends Entity<FertilizerProps> {
  constructor(props: FertilizerProps, id?: string) {
    const validation = Fertilizer.isValid(props);
    if (!validation.success) {
      throw new InvalidEntityCreationError(
        "Fertilizer", validation.field, props[validation.field], id
      );
    }

    super(props, id);
  }

  private static isValid({ name, applicableCropCategory }: FertilizerProps): ValidationFunctionReturn<FertilizerProps> {
    // Nome deve ter no mínimo 1 caractere
    if (name.trim().length === 0) {
      return { success: false, field: "name" };
    }

    // Se a categoria aplicável foi enviada, ela deve ter no mínimo 1 caractere
    if (applicableCropCategory !== undefined && !CropCategory.isValid(applicableCropCategory.toString())) {
      return { success: false, field: "applicableCropCategory" };
    }

    return { success: true };
  }

  public get name(): string {
    return this.props.name;
  }

  public get applicableCropCategory(): CropCategory | undefined {
    return this.props.applicableCropCategory;
  }
}