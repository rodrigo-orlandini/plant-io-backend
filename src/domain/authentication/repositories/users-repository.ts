import { RecoveryCode } from "../entities/recovery-code";
import { User } from "../entities/user";
import { Email } from "../value-objects/email";

export interface UsersRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  update(user: Partial<User>): Promise<void>;

  createRecoveryCode(recoveryCode: RecoveryCode): Promise<void>;
  findRecoveryCode(userId: string, code: string): Promise<RecoveryCode | null>;
}