import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { RecoveryCode } from "./recovery-code";

describe("Recovery Code", () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers(new Date("2024-01-01T00:00:00.000Z"));
  });

  afterEach(() => {
    clock.restore();
  });

  it("should create a valid recovery code", () => {
    const recoveryCode = new RecoveryCode({ code: "123456", userId: "user-id" });
    assert.ok(recoveryCode);
    assert.ok(!recoveryCode.isExpired());
  });

  it("should not create an invalid recovery code", () => {
    assert.throws(
      () => new RecoveryCode({ code: "", userId: "user-id" }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity RecoveryCode creation failed: code with value '' as type of string"
      }
    );
  });

  it("should expire the recovery code", () => {
    const recoveryCode = new RecoveryCode({ code: "123456", userId: "user-id" });
    
    clock.tick(11 * 60 * 1000);
    
    assert.ok(recoveryCode.isExpired());
  });

  it("should not create a recovery code without a user id", () => {
    assert.throws(
      () => new RecoveryCode({ code: "123456", userId: "" }),
      {
        name: "InvalidEntityCreationError",
        message: "Entity RecoveryCode creation failed: userId with value '' as type of string"
      }
    );
  });
});