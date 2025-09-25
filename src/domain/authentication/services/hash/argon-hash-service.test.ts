import { describe, it } from "node:test";
import assert from "node:assert";
import { ArgonHashService } from "./argon-hash-service";

describe("Argon Hash Service", () => {
  it("should hash a value", async () => {
    const hashService = new ArgonHashService();

    const value = "test";
    const hash = await hashService.hash(value);

    assert.ok(hash);
  });

  it("should verify a value", async () => {
    const hashService = new ArgonHashService();

    const value = "test";
    const hash = await hashService.hash(value);

    assert.ok(await hashService.verify(value, hash));
  });
});