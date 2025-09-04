import assert from "node:assert";
import { it, describe } from "node:test";

import { CropCategory } from "../value-objects/crop-category";
import { PestCategory } from "../value-objects/pest-category";

import { PestMedicine } from "./pest-medicine";

describe("Pest Medicine", () => {
  it("should create a complete pest medicine", () => {
    const pestMedicine = new PestMedicine({
      name: "neem oil",
      applicablePestCategory: new PestCategory("aphid infestation"),
      applicableCropCategory: new CropCategory("greens")
    });

    assert.notEqual(pestMedicine.id.toString(), undefined);
    assert.equal(pestMedicine.name, "neem oil");
    assert.equal(pestMedicine.applicablePestCategory, "aphid infestation");
    assert.equal(pestMedicine.applicableCropCategory?.toString(), "greens");
  });

  it("should create a pest medicine without an applicable crop category", () => {
    const pestMedicine = new PestMedicine({
      name: "neem oil",
      applicablePestCategory: new PestCategory("aphid infestation"),
    });

    assert.notEqual(pestMedicine.id.toString(), undefined);
    assert.equal(pestMedicine.name, "neem oil");
    assert.equal(pestMedicine.applicablePestCategory, "aphid infestation");
    assert.equal(pestMedicine.applicableCropCategory, undefined);
  });

  it("should not create a pest medicine with empty name", () => {
    assert.throws(
      () => new PestMedicine({ 
        name: "",
        applicablePestCategory: new PestCategory("aphid infestation"),
        applicableCropCategory: new CropCategory("greens")
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity PestMedicine creation failed: name with value '' as type of string"
      }
    );
  });

  it("should not create a pest medicine with empty applicable pest category", () => {
    assert.throws(
      () => new PestMedicine({ 
        name: "neem oil",
        applicablePestCategory: new PestCategory(""),
        applicableCropCategory: new CropCategory("greens")
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity PestCategory creation failed: value with value '' as type of string"
      }
    );
  });

  it("should not create a pest medicine with invalid applicable crop category", () => {
    assert.throws(
      () => new PestMedicine({ 
        name: "neem oil",
        applicablePestCategory: new PestCategory("aphid infestation"),
        applicableCropCategory: new CropCategory("")
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity CropCategory creation failed: value with value '' as type of string"
      }
    );
  });
});