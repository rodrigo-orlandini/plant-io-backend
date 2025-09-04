import assert from "node:assert";
import { it, describe } from "node:test";

import { Entity } from "./entity";

interface EntityProps {
  mock: boolean;
}

describe("Entity", () => {
  it("should create an entity successfully without an id", () => {
    const entity = new Entity<EntityProps>({ mock: true });

    assert.notEqual(entity.id, undefined);
  });

  it("should create an entity successfully with an existent id", () => {
    const entity = new Entity<EntityProps>({ mock: true }, "some-uuid");

    assert.equal(entity.id, "some-uuid");
  });
});