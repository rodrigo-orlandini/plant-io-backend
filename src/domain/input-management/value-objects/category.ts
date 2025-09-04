import { Slug } from "../../../@shared/slug";

export abstract class Category {
  private readonly value: string;
  private readonly slug: Slug;

  protected constructor(category: string) {
    this.value = category;
    this.slug = new Slug(category);
  }

  protected static isValid(category: string): boolean {
    return category.length > 0;
  }

  protected toString(): string {
    return this.value;
  }

  protected toSlug(): Slug {
    return this.slug;
  }
}