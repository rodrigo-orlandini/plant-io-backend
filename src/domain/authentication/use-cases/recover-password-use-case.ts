import { UseCase } from "../../../@types/use-case";
import { CodeExpiredError } from "../../../error/code-expired-error";
import { NotFoundError } from "../../../error/not-found-error";
import { UsersRepository } from "../repositories/users-repository";

export interface RecoverPasswordUseCaseRequest {
  userId: string;
  code: string;
  newPassword: string;
}

export interface RecoverPasswordUseCaseResponse {}

export class RecoverPasswordUseCase implements UseCase<RecoverPasswordUseCaseRequest, RecoverPasswordUseCaseResponse> {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(request: RecoverPasswordUseCaseRequest): Promise<RecoverPasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(request.userId);

    if(!user) {
      throw new NotFoundError("User", "id", request.userId);
    }

    const recoveryCode = await this.usersRepository.findRecoveryCode(request.userId, request.code);

    if(!recoveryCode) {
      throw new NotFoundError("RecoveryCode", "code", request.code);
    }

    if(recoveryCode.isExpired()) {
      throw new CodeExpiredError();
    }

    await user.setPassword(request.newPassword);
    await this.usersRepository.update(user);

    return {};
  }
}