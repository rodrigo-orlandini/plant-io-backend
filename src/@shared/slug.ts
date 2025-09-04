export class Slug {
  private readonly value: string;

  constructor(text: string) {
    this.value = Slug.slugify(text);
  }

  private static slugify(text: string): string {
    return text
    // Normaliza os caracteres
      .normalize("NFD")
    // Remove os acentos
      .replace(/[\u0300-\u036f]/g, "")
    // Transforma todos caracteres em minúsculo
      .toLowerCase()
    // Troca espaços e outros caracateres por "-"
      .replace(/[^\p{L}\p{N}]+/gu, "-")
    // Remove hífens repetidos (sequênciais)
      .replace(/-+/g, "-")
    // Remove hífens do ínicio e do fim
      .replace(/^-|-$/g, "");
  } 

  public toString(): string {
    return this.value;
  }
}