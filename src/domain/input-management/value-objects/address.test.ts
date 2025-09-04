import assert from "node:assert";
import { it, describe } from "node:test";

import { Address } from "./address";

describe("Address", () => {
  it("should create a valid address", () => {
    const address = new Address({
      street: "Some street",
      city: "Some city",
      district: "Some district",
      number: "100",
      state: "Some state"
    });

    assert.deepStrictEqual(address.toObject(), {
      street: "Some street",
      city: "Some city",
      district: "Some district",
      number: "100",
      state: "Some state"
    });
  });

  it("should not create an invalid address", () => {
    assert.throws(
      () => new Address({
        street: "Some street",
        city: "",
        district: "Some district",
        number: "100",
        state: "Some state"
      }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity Address creation failed: city with value '' as type of string"
      }
    );
  });
});