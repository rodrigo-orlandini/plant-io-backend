import assert from "node:assert";
import { it, describe, before } from "node:test";

import { v4 as uuidv4 } from "uuid";

import { Address } from "../value-objects/address";
import { CropCategory } from "../value-objects/crop-category";
import { CropStatus, CropStatusEnum } from "../value-objects/crop-status";
import { SupplierType, SupplierTypeEnum } from "../value-objects/supplier-type";

import { Crop } from "./crop";
import { CropStock } from "./crop-stock";
import { Supplier } from "./supplier";


describe("Crop Stock", () => {
  let crop: Crop;
  let address: Address;
  let supplier: Supplier;
  let purchasedAt: Date;

  before(() => {
    crop = new Crop({
      name: "lettuce",
      status: new CropStatus(CropStatusEnum.HARVEST),
      category: new CropCategory("greens")
    });

    address = new Address({
      city: "city", district: "district",
      number: "1234", state: "state", street: "street"
    });

    supplier = new Supplier({
      name: "supplier",
      type: new SupplierType(SupplierTypeEnum.CROP),
      address
    });

    purchasedAt = new Date();
  });

  it("should create a crop stock", () => {
    const cropStock = new CropStock({
      crop, amount: 100, price: 10,
      purchasedAt, supplier
    });

    assert.notEqual(cropStock.id.toString(), undefined);
    assert.equal(cropStock.supplier.name, "supplier");
    assert.equal(cropStock.price, 10);
    assert.equal(cropStock.amount, 100);
    assert.deepStrictEqual(cropStock.purchasedAt, purchasedAt);
    assert.equal(cropStock.stockedAt, undefined);
  });

  it("should not create a crop stock with negative price", () => {
    assert.throws(
      () => new CropStock({
        crop, amount: 100, price: -10,
        purchasedAt, supplier
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity CropStock creation failed: price with value '-10' as type of number"
      }
    );
  });

  it("should not create a crop stock with negative amount", () => {
    assert.throws(
      () => new CropStock({
        crop, amount: -100, price: 10,
        purchasedAt, supplier
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity CropStock creation failed: amount with value '-100' as type of number"
      }
    );
  });

  it("should not create a crop stock with invalid supplier", () => {
    const fertilizerSupplier = new Supplier({
      name: "supplier",
      type: new SupplierType(SupplierTypeEnum.FERTILIZER),
      address
    });

    const id = uuidv4();

    assert.throws(
      () => new CropStock({
        crop, amount: 100, price: 10,
        purchasedAt, supplier: fertilizerSupplier
      }, id),
      {
        name: "InvalidEntityCreationError",
        message: `Entity CropStock creation failed: supplier with value '${id}' as type of object`
      }
    );
  });
});