import { Entity } from "../../../@shared/entity";
import { ValidationFunctionReturn } from "../../../@types/validation-function-return";
import { InvalidEntityCreationError } from "../../../error/invalid-entity-creation-error";
import { Email } from "../value-objects/email";
import { HashService } from "../services/hash-service";
import { ArgonHashService } from "../services/hash/argon-hash-service";

export interface UserProps {
  email: Email;
  password: string;
}

interface UserPropsCreate extends Omit<UserProps, "password"> {}

export class User extends Entity<UserProps> {
  private hashService: HashService;

  constructor(props: UserPropsCreate, id?: string) {
    const validation = User.isValid(props);
    if(!validation.success) {
      throw new InvalidEntityCreationError(
        "User", validation.field, props[validation.field], id
      );
    }

    super({ ...props, password: "" }, id);
    this.hashService = new ArgonHashService();
  }

  private static isValid({ email }: UserPropsCreate): ValidationFunctionReturn<UserPropsCreate> {
    if(!Email.isValid(email.toString())) {
      return { success: false, field: "email" };
    }

    return { success: true };
  }

  public async setPassword(password: string): Promise<void> {
    this.props.password = await this.hashService.hash(password);
  }

  public async isPasswordValid(password: string): Promise<boolean> {
    return await this.hashService.verify(password, this.props.password);
  }

  public get email(): Email {
    return this.props.email;
  }
}