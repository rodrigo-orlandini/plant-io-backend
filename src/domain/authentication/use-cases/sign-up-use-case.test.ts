import assert from "node:assert";
import { it, describe } from "node:test";

import { SignUpUseCaseFactory } from "../../../test/factories/use-cases/sign-up-use-case-factory";
import { Email } from "../value-objects/email";

describe("Sign Up Use Case", () => {
  it("should sign up a user", async () => {
    const { useCase, usersRepository } = SignUpUseCaseFactory.create();

    await useCase.execute({
      email: new Email("test@test.com"),
      password: "password"
    });

    assert.equal(usersRepository.users.length, 1);
    assert.equal(usersRepository.users[0].email.toString(), "test@test.com");
  });

  it("should not sign up a user with an already existing email", async () => {
    const { useCase } = SignUpUseCaseFactory.create();

    await useCase.execute({
      email: new Email("test@test.com"),
      password: "password"
    });

    await assert.rejects(useCase.execute({
      email: new Email("test@test.com"),
      password: "password"
    }), {
      name: "AlreadyExistsError",
      message: "User already exists with email 'test@test.com'"
    });
  });
});