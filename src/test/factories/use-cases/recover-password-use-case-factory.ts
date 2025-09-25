import { RecoverPasswordUseCase } from "../../../domain/authentication/use-cases/recover-password-use-case";
import { StubUsersRepository } from "../../repositories/stub-users-repository";

export class RecoverPasswordUseCaseFactory {
  public static create() {
    const usersRepository = new StubUsersRepository();

    const useCase = new RecoverPasswordUseCase(usersRepository);

    return { useCase, usersRepository };
  }
}
