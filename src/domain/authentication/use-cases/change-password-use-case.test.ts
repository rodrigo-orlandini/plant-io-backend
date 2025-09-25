import { describe, it } from "node:test";
import { ChangePasswordUseCaseFactory } from "../../../test/factories/use-cases/change-password-use-case-factory";
import { User } from "../entities/user";
import { Email } from "../value-objects/email";
import assert from "node:assert";

describe("Change Password Use Case", () => {
  it("should change the password of a user", async () => {
    const { useCase, usersRepository } = ChangePasswordUseCaseFactory.create();

    const user = new User({
      email: new Email("test@test.com"),
    });
    await user.setPassword("password");
    await usersRepository.create(user);
		
    await useCase.execute({
      userId: user.id,
      oldPassword: "password",
      newPassword: "new-password"
    });

    assert.ok(await user.isPasswordValid("new-password"));
  });

  it("should not change the password of a user with an invalid user id", async () => {
    const { useCase } = ChangePasswordUseCaseFactory.create();

    await assert.rejects(useCase.execute({
      userId: "invalid-user-id",
      oldPassword: "password",
      newPassword: "new-password"
    }), {
      name: "NotFoundError",
      message: "User not found with id 'invalid-user-id'"
    });
  });

  it("should not change the password of a user with an invalid old password", async () => {
    const { useCase, usersRepository } = ChangePasswordUseCaseFactory.create();

    const user = new User({
      email: new Email("test@test.com"),
    });
    await user.setPassword("password");
    await usersRepository.create(user);

    await assert.rejects(useCase.execute({
      userId: user.id,
      oldPassword: "invalid-password",
      newPassword: "new-password"
    }), {
      name: "InvalidCredentialsError",
      message: "Invalid credentials"
    });
  });
});