import { Entity } from "../../../@shared/entity";
import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";
import { Address } from "../value-objects/address";
import { SupplierType } from "../value-objects/supplier-type";

// Fornecedor
export interface SupplierProps {
  // Nome do fornecedor
  name: string;
  // Endereço
  address: Address;
  // Tipo
  type: SupplierType;
}

export class Supplier extends Entity<SupplierProps> {
  constructor(props: SupplierProps, id?: string) {
    const validation = Supplier.isValid(props);
    if(!validation.success) {
      throw new InvalidEntityCreationError(
        "Supplier", validation.field, props[validation.field], id
      );
    }

    super(props, id);
  }

  private static isValid({ name, address, type }: SupplierProps): ValidationFunctionReturn<SupplierProps> {
    if(name.length === 0) {
      return { success: false, field: "name" };
    }

    if(!Address.isValid(address.toObject())) {
      return { success: false, field: "address" };
    }

    if(!SupplierType.isValid(type.toString())) {
      return { success: false, field: "type" };
    }

    return { success: true };
  }

  public get name(): string {
    return this.props.name;
  }

  public get address(): Address {
    return this.props.address;
  }

  public get type(): SupplierType {
    return this.props.type;
  }
}