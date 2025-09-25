import { UseCase } from "../../../@types/use-case";
import { InvalidCredentialsError } from "../../../error/invalid-credentials-error";
import { NotFoundError } from "../../../error/not-found-error";
import { UsersRepository } from "../repositories/users-repository";

export interface ChangePasswordUseCaseRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordUseCaseResponse {}

export class ChangePasswordUseCase implements UseCase<ChangePasswordUseCaseRequest, ChangePasswordUseCaseResponse> {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(request: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(request.userId);

    if(!user) {
      throw new NotFoundError("User", "id", request.userId);
    }

    const isOldPasswordValid = await user.isPasswordValid(request.oldPassword);

    if(!isOldPasswordValid) {
      throw new InvalidCredentialsError();
    }

    await user.setPassword(request.newPassword);
    await this.usersRepository.update(user);

    return {};
  }
}