
export class InvalidEntityCreationError extends Error {
  // eslint-disable-next-line
  constructor(entity: string, field: string, value: any, id?: string) {
    let treatedValue = value;
    if(typeof value === "object") {
      treatedValue = id ?? "OBJECT";
    }

    const message = `Entity ${entity} creation failed: ${field} with value '${treatedValue}' as type of ${typeof value}`;
		
    super(message);
    this.name = "InvalidEntityCreationError";
		
    Object.setPrototypeOf(this, InvalidEntityCreationError.prototype);
  }
}