import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";

export class Email {
  private readonly value: string;

  constructor(email: string) {
    const validate = Email.isValid(email);
    if(!validate) {
      throw new InvalidEntityCreationError(
        "Email", "value", email
      );
    }

    this.value = email;
  }

  public static isValid(email: string): boolean {
    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

    return regex.test(email);
  }

  public toString(): string {
    return this.value;
  }
}