import { StubUsersRepository } from "../../repositories/stub-users-repository";
import { StubEmailService } from "../../services/stub-email-service";
import { RequestRecoveryCodeUseCase } from "../../../src/domain/authentication/use-cases/request-recovery-code-use-case";

export class RequestRecoveryCodeUseCaseFactory {
  public static create() {
    const usersRepository = new StubUsersRepository();
    const emailService = new StubEmailService();

    const useCase = new RequestRecoveryCodeUseCase(usersRepository, emailService);

    return { useCase, usersRepository, emailService };
  }
}