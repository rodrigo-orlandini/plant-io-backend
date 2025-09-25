import { LoginUseCase } from "../../../domain/authentication/use-cases/login-use-case";
import { StubUsersRepository } from "../../repositories/stub-users-repository";

export class LoginUseCaseFactory {
  public static create() {
    const usersRepository = new StubUsersRepository();

    const useCase = new LoginUseCase(usersRepository);

    return { useCase, usersRepository };
  }
}
