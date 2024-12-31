import { AppService } from "../../utils/app-service.ts";
import crypto from "node:crypto";

/**
 * Naive implementation of password hashing
 */
export class PasswordService extends AppService {
  hash(password: string): { salt: string; hash: string } {
    // Creating a unique salt for a particular user
    const salt = crypto.randomBytes(16).toString("hex");

    // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    return { salt, hash };
  }

  compare({
    password,
    salt,
    hash,
  }: {
    password: string;
    salt: string;
    hash: string;
  }) {
    const attemptedPasswordHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return attemptedPasswordHash === hash;
  }
}
