import assert from "node:assert";
import { it, describe, before } from "node:test";

import { v4 as uuidv4 } from "uuid";

import { Address } from "../value-objects/address";
import { PestCategory } from "../value-objects/pest-category";
import { SupplierType, SupplierTypeEnum } from "../value-objects/supplier-type";

import { PestMedicine } from "./pest-medicine";
import { PestMedicineStock } from "./pest-medicine-stock";
import { Supplier } from "./supplier";

describe("PestMedicine Stock", () => {
  let pestMedicine: PestMedicine;
  let address: Address;
  let supplier: Supplier;
  let purchasedAt: Date;

  before(() => {
    pestMedicine = new PestMedicine({
      name: "lettuce",
      applicablePestCategory: new PestCategory("aphid infestation")
    });

    address = new Address({
      city: "city", district: "district",
      number: "1234", state: "state", street: "street"
    });

    supplier = new Supplier({
      name: "supplier",
      type: new SupplierType(SupplierTypeEnum.PEST_MEDICINE),
      address
    });

    purchasedAt = new Date();
  });

  it("should create a pest medicine stock", () => {
    const pestMedicineStock = new PestMedicineStock({
      pestMedicine, amount: 100, price: 10,
      purchasedAt, supplier
    });

    assert.notEqual(pestMedicineStock.id.toString(), undefined);
    assert.equal(pestMedicineStock.supplier.name, "supplier");
    assert.equal(pestMedicineStock.price, 10);
    assert.equal(pestMedicineStock.amount, 100);
    assert.deepStrictEqual(pestMedicineStock.purchasedAt, purchasedAt);
    assert.equal(pestMedicineStock.stockedAt, undefined);
  });

  it("should not create a pest medicine stock with negative price", () => {
    assert.throws(
      () => new PestMedicineStock({
        pestMedicine, amount: 100, price: -10,
        purchasedAt, supplier
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity PestMedicineStock creation failed: price with value '-10' as type of number"
      }
    );
  });

  it("should not create a pest medicine stock with negative amount", () => {
    assert.throws(
      () => new PestMedicineStock({
        pestMedicine, amount: -100, price: 10,
        purchasedAt, supplier
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity PestMedicineStock creation failed: amount with value '-100' as type of number"
      }
    );
  });

  it("should not create a pest medicine stock with invalid supplier", () => {
    const fertilizerSupplier = new Supplier({
      name: "supplier",
      type: new SupplierType(SupplierTypeEnum.FERTILIZER),
      address
    });

    const id = uuidv4();

    assert.throws(
      () => new PestMedicineStock({
        pestMedicine, amount: 100, price: 10,
        purchasedAt, supplier: fertilizerSupplier
      }, id),
      {
        name: "InvalidEntityCreationError",
        message: `Entity PestMedicineStock creation failed: supplier with value '${id}' as type of object`
      }
    );
  });
});