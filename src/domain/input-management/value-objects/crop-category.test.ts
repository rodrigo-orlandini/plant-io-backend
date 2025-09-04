import assert from "node:assert";
import { it, describe } from "node:test";

import { CropCategory } from "./crop-category";

describe("Crop Category", () => {
  it("should create a valid crop category", () => {
    const cropCategory = new CropCategory("Greens and Tubers");

    assert.equal(cropCategory.toString(), "Greens and Tubers");
    assert.equal(cropCategory.toSlug().toString(), "greens-and-tubers");
  });

  it("should not create an invalid crop category", () => {
    assert.throws(
      () => new CropCategory(""),
      {
        name: "InvalidEntityCreationError",
        message: "Entity CropCategory creation failed: value with value '' as type of string"
      }
    );
  });
});