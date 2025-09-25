export interface HashService {
  hash(value: string): Promise<string>;
  verify(value: string, hash: string): Promise<boolean>;
}