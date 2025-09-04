import assert from "node:assert";
import { it, describe } from "node:test";

import { CropCategory } from "../value-objects/crop-category";

import { Fertilizer } from "./fertilizer";

describe("Fertilizer", () => {
  it("should create a complete fertilizer", () => {
    const fertilizer = new Fertilizer({
      name: "bone meal",
      applicableCropCategory: new CropCategory("greens")
    });

    assert.notEqual(fertilizer.id.toString(), undefined);
    assert.equal(fertilizer.name, "bone meal");
    assert.equal(fertilizer.applicableCropCategory?.toString(), "greens");
  });

  it("should create a seed without a applicable seed category", () => {
    const fertilizer = new Fertilizer({
      name: "bone meal",
    });

    assert.notEqual(fertilizer.id.toString(), undefined);
    assert.equal(fertilizer.name, "bone meal");
    assert.equal(fertilizer.applicableCropCategory, undefined);
  });

  it("should not create a fertilizer with empty name", () => {
    assert.throws(
      () => new Fertilizer({ name: "", applicableCropCategory: new CropCategory("greens") }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity Fertilizer creation failed: name with value '' as type of string"
      }
    );
  });

  it("should not create a fertilizer with empty applicable seed category", () => {
    assert.throws(
      () => new Fertilizer({ name: "bone meal", applicableCropCategory: new CropCategory("") }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity CropCategory creation failed: value with value '' as type of string"
      }
    );
  });
});