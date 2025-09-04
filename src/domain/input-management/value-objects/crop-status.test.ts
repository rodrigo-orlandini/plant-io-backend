import assert from "node:assert";
import { it, describe } from "node:test";

import { CropStatus, CropStatusEnum } from "./crop-status";

describe("Crop Status", () => {
  it("should create a valid crop status", () => {
    const cropStatus = new CropStatus(CropStatusEnum.HARVEST);

    assert.equal(cropStatus.toString(), CropStatusEnum.HARVEST);
  });

  it("should not create an invalid crop status", () => {
    assert.throws(
      () => new CropStatus("FAKE STATUS"),
      {
        name: "InvalidEntityCreationError",
        message: "Entity CropStatus creation failed: value with value 'FAKE STATUS' as type of string"
      }
    );
  });
});