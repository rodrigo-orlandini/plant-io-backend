import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";

export interface AddressProps {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
}

export class Address {
  private readonly value: AddressProps;
	
  constructor(address: AddressProps) {
    const validation = Address.isValid(address);
    if(!validation.success) {
      throw new InvalidEntityCreationError(
        "Address", validation.field, address[validation.field]
      );
    }

    this.value = address;
  }

  public static isValid(address: AddressProps): ValidationFunctionReturn<AddressProps> {
    const keys = Object.keys(address);

    for(const key of keys) {
      if(address[key as keyof AddressProps].length === 0) {
        return { success: false, field: key as keyof AddressProps };
      }
    }

    return { success: true };
  }

  public toObject(): AddressProps {
    return this.value;
  }
}