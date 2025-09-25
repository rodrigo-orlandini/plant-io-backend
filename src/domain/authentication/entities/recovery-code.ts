import { Entity } from "../../../@shared/entity";
import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";

export interface RecoveryCodeProps {
  code: string;
  expiresAt: Date;
  userId: string;
}

interface RecoveryCodePropsCreate extends Omit<RecoveryCodeProps, "expiresAt"> {}

export class RecoveryCode extends Entity<RecoveryCodeProps> {
  private readonly EXPIRATION_TIME = 10 * 60 * 1000; // 5 minutes

  constructor(props: RecoveryCodePropsCreate, id?: string) {
    const validation = RecoveryCode.isValid(props);
    if(!validation.success) {
      throw new InvalidEntityCreationError(
        "RecoveryCode", validation.field, props[validation.field], id
      );
    }

    super({ ...props, expiresAt: new Date() }, id);
    this.props.expiresAt = new Date(Date.now() + this.EXPIRATION_TIME);
  }

  private static isValid({ code, userId }: RecoveryCodePropsCreate): ValidationFunctionReturn<RecoveryCodePropsCreate> {
    if(!code || code.trim().length === 0) {
      return { success: false, field: "code" };
    }

    if(!userId || userId.trim().length === 0) {
      return { success: false, field: "userId" };
    }

    return { success: true };
  }

  public isExpired(): boolean {
    return this.props.expiresAt < new Date();
  }

  public get code(): string {
    return this.props.code;
  }

  public get userId(): string {
    return this.props.userId;
  }
}