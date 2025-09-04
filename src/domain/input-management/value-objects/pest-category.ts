import { Slug } from "../../../@shared/slug";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";

import { Category } from "./category";

export class PestCategory extends Category {
  constructor(pestCategory: string) {
    if(!PestCategory.isValid(pestCategory)) {
      throw new InvalidEntityCreationError(
        "PestCategory", "value", pestCategory
      );
    }

    super(pestCategory);
  }

  public static override isValid(pestCategory: string): boolean {
    return super.isValid(pestCategory);
  }

  public override toString(): string {
    return super.toString();
  }

  public override toSlug(): Slug {
    return super.toSlug();
  }
}