import assert from "node:assert";
import { it, describe } from "node:test";

import { PestCategory } from "./pest-category";

describe("Pest Category", () => {
  it("should create a valid pest category", () => {
    const pestCategory = new PestCategory("Aphid Infestation");

    assert.equal(pestCategory.toString(), "Aphid Infestation");
    assert.equal(pestCategory.toSlug().toString(), "aphid-infestation");
  });

  it("should not create an invalid pest category", () => {
    assert.throws(
      () => new PestCategory(""),
      {
        name: "InvalidEntityCreationError",
        message: "Entity PestCategory creation failed: value with value '' as type of string"
      }
    );
  });
});