import { RecoveryCode } from "../../domain/authentication/entities/recovery-code";
import { User } from "../../domain/authentication/entities/user";
import { Email } from "../../domain/authentication/value-objects/email";

export class StubUsersRepository {
  public users: User[] = [];
  public recoveryCodes: RecoveryCode[] = [];

  public async create(user: User): Promise<void> {
    this.users.push(user);
  }

  public async findByEmail(email: Email): Promise<User | null> {
    return this.users.find(user => user.email.toString() === email.toString()) ?? null;
  }

  public async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) ?? null;
  }

  public async update(user: Partial<User>): Promise<void> {
    const index = this.users.findIndex(user => user.id === user.id);

    this.users[index] = { ...this.users[index], ...user } as User;
  }

  public async createRecoveryCode(recoveryCode: RecoveryCode): Promise<void> {
    this.recoveryCodes.push(recoveryCode);
  }

  public async findRecoveryCode(userId: string, code: string): Promise<RecoveryCode | null> {
    return this.recoveryCodes.find(recoveryCode => 
      recoveryCode.userId === userId && recoveryCode.code === code
    ) ?? null;
  }
}
