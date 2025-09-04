import assert from "node:assert";
import { it, describe } from "node:test";

import { CropCategory } from "../value-objects/crop-category";
import { CropStatus, CropStatusEnum } from "../value-objects/crop-status";

import { Crop } from "./crop";

describe("Crop", () => {
  it("should create a complete crop", () => {
    const crop = new Crop({
      name: "lettuce",
      category: new CropCategory("greens"),
      status: new CropStatus(CropStatusEnum.SEED)
    });

    assert.notEqual(crop.id.toString(), undefined);
    assert.equal(crop.name, "lettuce");
    assert.equal(crop.category?.toString(), "greens");
    assert.equal(crop.status, CropStatusEnum.SEED);
  });

  it("should create a crop without a category", () => {
    const crop = new Crop({
      name: "lettuce",
      status: new CropStatus(CropStatusEnum.SEED)
    });

    assert.notEqual(crop.id.toString(), undefined);
    assert.equal(crop.name, "lettuce");
    assert.equal(crop.category, undefined);
    assert.equal(crop.status, CropStatusEnum.SEED);
  });

  it("should not create a crop with empty name", () => {
    assert.throws(
      () => new Crop({ 
        name: "", 
        category: new CropCategory("greens"), 
        status: new CropStatus(CropStatusEnum.SEED)
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity Crop creation failed: name with value '' as type of string"
      }
    );
  });

  it("should not create a crop with empty category", () => {
    assert.throws(
      () => new Crop({ 
        name: "lettuce", 
        category: new CropCategory(""),
        status: new CropStatus(CropStatusEnum.SEED)
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity CropCategory creation failed: value with value '' as type of string"
      }
    );
  });

  it("should not create a crop with invalid status", () => {
    assert.throws(
      () => new Crop({ 
        name: "lettuce", 
        category: new CropCategory("greens"),
        status: new CropStatus("FAKE STATUS")
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity CropStatus creation failed: value with value 'FAKE STATUS' as type of string"
      }
    );
  });
});