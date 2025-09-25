import argon2 from "argon2";
import { HashService } from "../hash-service";

export class ArgonHashService implements HashService {
  public async hash(value: string): Promise<string> {
    return await argon2.hash(value);
  }

  public async verify(value: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, value);
  }
}