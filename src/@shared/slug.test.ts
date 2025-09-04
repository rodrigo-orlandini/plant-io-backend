import assert from "node:assert";
import { it, describe } from "node:test";

import { Slug } from "./slug";

describe("Slug", () => {
  it("should create slugs", () => {
    // Teste: Gabarito
    const textsToVerify = {
      "teste acèéêntõ": "teste-aceeento",
      "TesTE CasE SENsitive": "teste-case-sensitive",
      "teste espaço#e%outros/caracteres": "teste-espaco-e-outros-caracteres",
      "teste- hífens-/repetidos": "teste-hifens-repetidos",
      " teste hífens nas bordas/": "teste-hifens-nas-bordas"
    };

    Object.entries(textsToVerify).forEach(([text, expected]) => {
      const slug = new Slug(text);

      assert.equal(slug.toString(), expected);
    });
  });
});