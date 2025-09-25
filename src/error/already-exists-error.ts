export class AlreadyExistsError extends Error {
  // eslint-disable-next-line
  constructor(entity: string, field: string, value: any) {
    const message = `${entity} already exists with ${field} '${value}'`;

    super(message);
    this.name = "AlreadyExistsError";

    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
  }
}