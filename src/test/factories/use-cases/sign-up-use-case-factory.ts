import { SignUpUseCase } from "../../../domain/authentication/use-cases/sign-up-use-case";
import { StubUsersRepository } from "../../repositories/stub-users-repository";

export class SignUpUseCaseFactory {
  public static create() {
    const usersRepository = new StubUsersRepository();

    const useCase = new SignUpUseCase(usersRepository);

    return { useCase, usersRepository };
  }
}
