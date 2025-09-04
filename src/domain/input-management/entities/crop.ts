import { Entity } from "../../../@shared/entity";
import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";
import { CropCategory } from "../value-objects/crop-category";
import { CropStatus } from "../value-objects/crop-status";

// Cultura / Hortaliça / Plantação
export interface CropProps {
  // Nome da cultura
  name: string;
  // Categoria da cultura
  category?: CropCategory;
  // Status da cultura
  status: CropStatus;
}

export class Crop extends Entity<CropProps> {
  constructor(props: CropProps, id?: string) {
    const validation = Crop.isValid(props);
    if (!validation.success) {
      throw new InvalidEntityCreationError(
        "Crop", validation.field, props[validation.field], id
      );
    }

    super(props, id);
  }

  private static isValid({ name, category, status }: CropProps): ValidationFunctionReturn<CropProps> {
    // Nome deve ter no mínimo 1 caractere
    if (name.trim().length === 0) {
      return { success: false, field: "name" };
    }

    // Se a categoria foi enviada, ela deve ter no mínimo 1 caractere
    if (category !== undefined && !CropCategory.isValid(category.toString())) {
      return { success: false, field: "category" };
    }

    // O status deve ser um dos permitidos no enum de status
    if(!CropStatus.isValid(status.toString())) {
      return { success: false, field: "status" };
    }

    return { success: true };
  }

  public get name(): string {
    return this.props.name;
  }

  public get category(): CropCategory | undefined {
    return this.props.category;
  }

  public get status(): CropStatus {
    return this.props.status;
  }
}