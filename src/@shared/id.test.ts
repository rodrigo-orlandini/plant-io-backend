import assert from "node:assert";
import { it, describe } from "node:test";

import { Id } from "./id";

describe("Id", () => {
  it("should create a fresh id successfully", () => {
    const id = new Id();

    assert.notEqual(id.toString(), undefined);
  });

  it("should load an existent id inside an Id object instance", () => {
    const id = new Id("some-uuid");

    assert.equal(id.toString(), "some-uuid");
  });

  it("should not create an empty id", () => {
    assert.throws(
      () => new Id(""),
      {
        name: "InvalidEntityCreationError",
        message: "Entity Id creation failed: value with value '' as type of string"
      }
    );
  });
});