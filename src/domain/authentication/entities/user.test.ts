import assert from "node:assert";
import { it, describe } from "node:test";

import { User } from "./user";
import { Email } from "../value-objects/email";

describe("User", () => {
  it("should create a valid user", async () => {
    const user = new User({ 
      email: new Email("test@test.com"), 
    });
    await user.setPassword("password");

    assert.equal(user.email.toString(), "test@test.com");
    assert.ok(await user.isPasswordValid("password"));
  });

  it("should not create an invalid user", () => {
    assert.throws(
      () => new User({ email: new Email("test@test") }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity Email creation failed: value with value 'test@test' as type of string"
      }
    );
  });

  it("should change the password of a user", async () => {
    const user = new User({ 
      email: new Email("test@test.com"), 
    });
    await user.setPassword("new-password");

    assert.ok(await user.isPasswordValid("new-password"));
  });
});