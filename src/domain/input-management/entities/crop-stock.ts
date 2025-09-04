import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";
import { SupplierTypeEnum } from "../value-objects/supplier-type";

import { Crop } from "./crop";
import { Stock, StockProps } from "./stock";
import { Supplier } from "./supplier";

// Estoque de sementes e hortaliças
export interface CropStockProps extends StockProps {
  // Semente / hortaliça
  crop: Crop;
}

export class CropStock extends Stock<CropStockProps> {
  constructor(props: CropStockProps, id?: string) {
    const validation = CropStock.isValid(props);
    if(!validation.success) {
      throw new InvalidEntityCreationError(
        "CropStock", validation.field, props[validation.field], id
      );
    }
		
    super(props, id);
  }

  public static override isValid(cropStock: CropStockProps): ValidationFunctionReturn<StockProps> {
    if(cropStock.supplier.type.toString() !== SupplierTypeEnum.CROP) {
      return { success: false, field: "supplier" };
    }

    return super.isValid(cropStock);
  }

  public get supplier(): Supplier {
    return this.props.supplier;
  }
	
  public get price(): number {
    return this.props.price;
  }

  public get purchasedAt(): Date {
    return this.props.purchasedAt;
  }

  public get stockedAt(): Date | undefined {
    return this.props.stockedAt;
  }

  public get amount(): number {
    return this.props.amount;
  }
}