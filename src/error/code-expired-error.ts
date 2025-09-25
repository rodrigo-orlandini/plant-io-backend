export class CodeExpiredError extends Error {
  constructor() {
    super("Code expired");
    this.name = "CodeExpiredError";

    Object.setPrototypeOf(this, CodeExpiredError.prototype);
  }
}