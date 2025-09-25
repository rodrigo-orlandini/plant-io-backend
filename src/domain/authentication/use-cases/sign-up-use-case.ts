import { UseCase } from "../../../@types/use-case";
import { Email } from "../value-objects/email";
import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { AlreadyExistsError } from "../../../error/already-exists-error";

export interface SignUpUseCaseRequest {
  email: Email;
  password: string;
}

export interface SignUpUseCaseResponse {}

export class SignUpUseCase implements UseCase<SignUpUseCaseRequest, SignUpUseCaseResponse> {
  constructor (
    private readonly usersRepository: UsersRepository
  ) {}

  public async execute(request: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(request.email);

    if (user) {
      throw new AlreadyExistsError("User", "email", request.email.toString());
    }

    const newUser = new User({
      email: request.email,
    });

    await newUser.setPassword(request.password);
    await this.usersRepository.create(newUser);

    return {};
  }
}