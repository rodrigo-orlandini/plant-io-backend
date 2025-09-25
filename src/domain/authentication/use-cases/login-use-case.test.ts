import { describe, it } from "node:test";
import { LoginUseCaseFactory } from "../../../test/factories/use-cases/login-use-case-factory";
import { Email } from "../value-objects/email";
import assert from "node:assert";
import { User } from "../entities/user";

describe("Login Use Case", () => {
  it("should login a user", async () => {
    const { useCase, usersRepository } = LoginUseCaseFactory.create();

    const user = new User({
      email: new Email("test@test.com"),
    });

    await user.setPassword("password");
    await usersRepository.create(user);

    const response = await useCase.execute({
      email: new Email("test@test.com"),
      password: "password"
    });

    assert.deepStrictEqual(response, {});
  });

  it("should not login a user with an invalid email", async () => {
    const { useCase } = LoginUseCaseFactory.create();

    await assert.rejects(useCase.execute({
      email: new Email("test@test.com"),
      password: "password"
    }), {
      name: "InvalidCredentialsError",
      message: "Invalid credentials"
    });
  });

  it("should not login a user with an invalid password", async () => {
    const { useCase, usersRepository } = LoginUseCaseFactory.create();

    const user = new User({
      email: new Email("test@test.com"),
    });

    await user.setPassword("password");
    await usersRepository.create(user);

    await assert.rejects(useCase.execute({
      email: new Email("test@test.com"),
      password: "invalid password"
    }), {
      name: "InvalidCredentialsError",
      message: "Invalid credentials"
    });
  });
});