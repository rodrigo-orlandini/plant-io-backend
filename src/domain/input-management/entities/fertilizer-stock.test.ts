import assert from "node:assert";
import { it, describe, before } from "node:test";

import { v4 as uuidv4 } from "uuid";

import { Address } from "../value-objects/address";
import { SupplierType, SupplierTypeEnum } from "../value-objects/supplier-type";

import { Fertilizer } from "./fertilizer";
import { FertilizerStock } from "./fertilizer-stock";
import { Supplier } from "./supplier";

describe("Fertilizer Stock", () => {
  let fertilizer: Fertilizer;
  let address: Address;
  let supplier: Supplier;
  let purchasedAt: Date;

  before(() => {
    fertilizer = new Fertilizer({ name: "bone meal" });

    address = new Address({
      city: "city", district: "district",
      number: "1234", state: "state", street: "street"
    });

    supplier = new Supplier({
      name: "supplier",
      type: new SupplierType(SupplierTypeEnum.FERTILIZER),
      address
    });

    purchasedAt = new Date();
  });

  it("should create a fertilizer stock", () => {
    const fertilizerStock = new FertilizerStock({
      fertilizer, amount: 100, price: 10,
      purchasedAt, supplier
    });

    assert.notEqual(fertilizerStock.id.toString(), undefined);
    assert.equal(fertilizerStock.supplier.name, "supplier");
    assert.equal(fertilizerStock.price, 10);
    assert.equal(fertilizerStock.amount, 100);
    assert.deepStrictEqual(fertilizerStock.purchasedAt, purchasedAt);
    assert.equal(fertilizerStock.stockedAt, undefined);
  });

  it("should not create a fertilizer stock with negative price", () => {
    assert.throws(
      () => new FertilizerStock({
        fertilizer, amount: 100, price: -10,
        purchasedAt, supplier
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity FertilizerStock creation failed: price with value '-10' as type of number"
      }
    );
  });

  it("should not create a fertilizer stock with negative amount", () => {
    assert.throws(
      () => new FertilizerStock({
        fertilizer, amount: -100, price: 10,
        purchasedAt, supplier
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity FertilizerStock creation failed: amount with value '-100' as type of number"
      }
    );
  });

  it("should not create a fertilizer stock with invalid supplier", () => {
    const cropSupplier = new Supplier({
      name: "supplier",
      type: new SupplierType(SupplierTypeEnum.CROP),
      address
    });

    const id = uuidv4();

    assert.throws(
      () => new FertilizerStock({
        fertilizer, amount: 100, price: 10,
        purchasedAt, supplier: cropSupplier
      }, id),
      {
        name: "InvalidEntityCreationError",
        message: `Entity FertilizerStock creation failed: supplier with value '${id}' as type of object`
      }
    );
  });
});