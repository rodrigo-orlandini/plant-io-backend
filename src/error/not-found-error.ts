export class NotFoundError extends Error {
  // eslint-disable-next-line
  constructor(entity: string, field: string, value: any) {
    const message = `${entity} not found with ${field} '${value}'`;

    super(message);
    this.name = "NotFoundError";

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}