import { describe, it } from "node:test";
import assert from "node:assert";
import { RequestRecoveryCodeUseCaseFactory } from "../../../test/factories/use-cases/request-recovery-code-use-case-factory";
import { Email } from "../value-objects/email";
import { User } from "../entities/user";

describe("Request Recovery Code Use Case", () => {
  it("should request a recovery code", async () => {
    const { useCase, usersRepository } = RequestRecoveryCodeUseCaseFactory.create();

    const user = new User({
      email: new Email("test@test.com"),
    });
    await usersRepository.create(user);

    await useCase.execute({
      email: new Email("test@test.com"),
    });

    assert.equal(usersRepository.recoveryCodes.length, 1);
    assert.ok(usersRepository.recoveryCodes[0].code.length === 6);
    assert.ok(!usersRepository.recoveryCodes[0].isExpired());
    assert.equal(usersRepository.recoveryCodes[0].userId, user.id);
  });

  it("should not request a recovery code for a non-existent user", async () => {
    const { useCase } = RequestRecoveryCodeUseCaseFactory.create();

    await assert.rejects(useCase.execute({
      email: new Email("test@test.com"),
    }), {
      name: "NotFoundError",
      message: "User not found with email 'test@test.com'"
    });
  });
});