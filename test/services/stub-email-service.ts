import { Email } from "../../src/domain/authentication/value-objects/email";

export class StubEmailService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async send(_: Email, __: string, ___: string): Promise<void> {
    return Promise.resolve();
  }
}