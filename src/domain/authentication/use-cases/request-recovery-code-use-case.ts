import { UseCase } from "../../../@types/use-case";
import { Email } from "../value-objects/email";
import { UsersRepository } from "../repositories/users-repository";
import { NotFoundError } from "../../../error/not-found-error";
import { EmailService } from "../services/email-service";
import { recoveryCodeRequestTemplate } from "../services/email-templates/recovery-code-request-template";
import { RecoveryCode } from "../entities/recovery-code";

export interface RequestRecoveryCodeUseCaseRequest {
  email: Email;
}

export interface RequestRecoveryCodeUseCaseResponse {}

export class RequestRecoveryCodeUseCase implements UseCase<RequestRecoveryCodeUseCaseRequest, RequestRecoveryCodeUseCaseResponse> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly emailService: EmailService,
  ) {}

  public async execute(request: RequestRecoveryCodeUseCaseRequest): Promise<RequestRecoveryCodeUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(request.email);

    if(!user) {
      throw new NotFoundError("User", "email", request.email.toString());
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    const recoveryCode = new RecoveryCode({ code: randomCode, userId: user.id });

    await this.usersRepository.createRecoveryCode(recoveryCode);
    await this.emailService.send(request.email, "Recover Code", recoveryCodeRequestTemplate(randomCode));

    return {};
  }
}