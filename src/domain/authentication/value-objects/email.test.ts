import assert from "node:assert";
import { it, describe } from "node:test";


import { Email } from "./email";

describe("Email", () => {
  it("should create a valid email", () => {
    const email = new Email("test@test.com");

    assert.equal(email.toString(), "test@test.com");
  });

  it("should not create an invalid email", () => {
    assert.throws(
      () => new Email("test@test"),
      {
        name: "InvalidEntityCreationError",
        message: "Entity Email creation failed: value with value 'test@test' as type of string"
      }
    );
  });
});