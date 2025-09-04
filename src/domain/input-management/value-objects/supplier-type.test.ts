import assert from "node:assert";
import { it, describe } from "node:test";

import { SupplierType, SupplierTypeEnum } from "./supplier-type";

describe("Supplier Type", () => {
  it("should create a valid crop status", () => {
    const supplierType = new SupplierType(SupplierTypeEnum.FERTILIZER);

    assert.equal(supplierType.toString(), SupplierTypeEnum.FERTILIZER);
  });

  it("should not create an invalid crop status", () => {
    assert.throws(
      () => new SupplierType("FAKE STATUS"),
      {
        name: "InvalidEntityCreationError",
        message: "Entity SupplierType creation failed: value with value 'FAKE STATUS' as type of string"
      }
    );
  });
});