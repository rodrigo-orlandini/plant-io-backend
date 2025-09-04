import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";
import { SupplierTypeEnum } from "../value-objects/supplier-type";

import { PestMedicine } from "./pest-medicine";
import { Stock, StockProps } from "./stock";
import { Supplier } from "./supplier";

// Estoque de remédio de pragas
export interface PestMedicineStockProps extends StockProps {
  // Remédio de pragas
  pestMedicine: PestMedicine;
}

export class PestMedicineStock extends Stock<PestMedicineStockProps> {
  constructor(props: PestMedicineStockProps, id?: string) {
    const validation = PestMedicineStock.isValid(props);
    if(!validation.success) {
      throw new InvalidEntityCreationError(
        "PestMedicineStock", validation.field, props[validation.field], id
      );
    }
		
    super(props, id);
  }

  public static override isValid(
    pestMedicineStock: PestMedicineStockProps
  ): ValidationFunctionReturn<StockProps> {
    if(pestMedicineStock.supplier.type.toString() !== SupplierTypeEnum.PEST_MEDICINE) {
      return { success: false, field: "supplier" };
    }

    return super.isValid(pestMedicineStock);
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