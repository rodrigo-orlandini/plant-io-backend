import { ChangePasswordUseCase } from "../../../domain/authentication/use-cases/change-password-use-case";
import { StubUsersRepository } from "../../repositories/stub-users-repository";

export class ChangePasswordUseCaseFactory {
  public static create() {
    const usersRepository = new StubUsersRepository();

    const useCase = new ChangePasswordUseCase(usersRepository);

    return { useCase, usersRepository };
  }
}
