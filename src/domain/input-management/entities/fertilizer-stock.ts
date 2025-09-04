import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";
import { SupplierTypeEnum } from "../value-objects/supplier-type";

import { Fertilizer } from "./fertilizer";
import { Stock, StockProps } from "./stock";
import { Supplier } from "./supplier";

// Estoque de adubos
export interface FertilizerStockProps extends StockProps {
  // Adubo
  fertilizer: Fertilizer;
}

export class FertilizerStock extends Stock<FertilizerStockProps> {
  constructor(props: FertilizerStockProps, id?: string) {
    const validation = FertilizerStock.isValid(props);
    if(!validation.success) {
      throw new InvalidEntityCreationError(
        "FertilizerStock", validation.field, props[validation.field], id
      );
    }
		
    super(props, id);
  }

  public static override isValid(fertilizerStock: FertilizerStockProps): ValidationFunctionReturn<StockProps> {
    if(fertilizerStock.supplier.type.toString() !== SupplierTypeEnum.FERTILIZER) {
      return { success: false, field: "supplier" };
    }

    return super.isValid(fertilizerStock);
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