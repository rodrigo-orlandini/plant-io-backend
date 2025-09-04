import { Entity } from "../../../@shared/entity";
import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";

import { Supplier } from "./supplier";

// Estoque (geral)
export interface StockProps {
  // Fornecedor
  supplier: Supplier;
  // Custo
  price: number;
  // Data da compra
  purchasedAt: Date;
  // Data da entrada em estoque
  stockedAt?: Date;
  // Quantidade (g)
  amount: number;
}

type ExtendableStockProps<T> = StockProps & T;

export abstract class Stock<T> extends Entity<ExtendableStockProps<T>> {
  protected constructor(props: ExtendableStockProps<T>, id?: string) {
    const validation = Stock.isValid(props);
    if(!validation.success) {
      throw new InvalidEntityCreationError(
        "Stock", validation.field, props[validation.field], id
      );
    }

    super(props, id);
  }

  protected static isValid(stock: StockProps): ValidationFunctionReturn<StockProps> {
    if(!stock.price || stock.price <= 0) {
      return { success: false, field: "price" };
    }

    if(!stock.amount || stock.amount <= 0) {
      return { success: false, field: "amount" };
    }

    return { success: true };
  }
}