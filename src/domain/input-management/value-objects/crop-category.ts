import { Slug } from "../../../@shared/slug";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";

import { Category } from "./category";

export class CropCategory extends Category {
  constructor(cropCategory: string) {
    if(!CropCategory.isValid(cropCategory)) {
      throw new InvalidEntityCreationError(
        "CropCategory", "value", cropCategory
      );
    }

    super(cropCategory);
  }

  public static override isValid(cropCategory: string): boolean {
    return super.isValid(cropCategory);
  }

  public override toString(): string {
    return super.toString();
  }

  public override toSlug(): Slug {
    return super.toSlug();
  }
}