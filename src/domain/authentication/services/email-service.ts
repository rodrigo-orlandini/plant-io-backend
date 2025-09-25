import { Email } from "../value-objects/email";

export interface EmailService {
  send(email: Email, subject: string, body: string): Promise<void>;
}