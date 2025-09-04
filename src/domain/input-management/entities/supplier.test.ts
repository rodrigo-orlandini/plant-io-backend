import assert from "node:assert";
import { it, describe, before } from "node:test";

import { Address } from "../value-objects/address";
import { SupplierType, SupplierTypeEnum } from "../value-objects/supplier-type";

import { Supplier } from "./supplier";


describe("Supplier", () => {
  let address: Address;

  before(() => {
    address = new Address({
      street: "Some street",
      city: "Some city",
      district: "Some district",
      number: "100",
      state: "Some state"
    });
  });

  it("should create a supplier", () => {
    const supplier = new Supplier({
      name: "Fertilizer Supplier",
      type: new SupplierType(SupplierTypeEnum.FERTILIZER),
      address
    });

    assert.notEqual(supplier.id.toString(), undefined);
    assert.equal(supplier.name, "Fertilizer Supplier");
    assert.equal(supplier.type, SupplierTypeEnum.FERTILIZER);
    assert.deepStrictEqual(supplier.address.toObject(), {
      street: "Some street",
      city: "Some city",
      district: "Some district",
      number: "100",
      state: "Some state"
    });
  });

  it("should not create a supplier with empty name", () => {
    assert.throws(
      () => new Supplier({
        name: "",
        type: new SupplierType(SupplierTypeEnum.FERTILIZER),
        address
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity Supplier creation failed: name with value '' as type of string"
      }
    );
  });

  it("should not create a supplier with invalid type", () => {
    assert.throws(
      () => new Supplier({
        name: "Fertilizer Supplier",
        type: new SupplierType("FAKE SUPPLIER TYPE"),
        address
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity SupplierType creation failed: value with value 'FAKE SUPPLIER TYPE' as type of string"
      }
    );
  });

  it("should not create a supplier with invalid address", () => {
    assert.throws(
      () => new Supplier({
        name: "Fertilizer Supplier",
        type: new SupplierType(SupplierTypeEnum.FERTILIZER),
        address: new Address({
          street: "Some street",
          city: "",
          district: "Some district",
          number: "100",
          state: "Some state"
        })
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity Address creation failed: city with value '' as type of string"
      }
    );
  });
});