import { UseCase } from "../../../@types/use-case";
import { InvalidCredentialsError } from "../../../error/invalid-credentials-error";
import { UsersRepository } from "../repositories/users-repository";
import { Email } from "../value-objects/email";

export interface LoginUseCaseRequest {
  email: Email;
  password: string;
}

export interface LoginUseCaseResponse {}

export class LoginUseCase implements UseCase<LoginUseCaseRequest, LoginUseCaseResponse> {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(request: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(request.email);

    if(!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await user.isPasswordValid(request.password);

    if(!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return {};
  }
}