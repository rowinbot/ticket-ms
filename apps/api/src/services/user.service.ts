import { AppService } from "../utils/app-service.ts";
import { PasswordService } from "./utils/password.service.ts";

export class UserService extends AppService {
  private readonly passwordService: PasswordService;

  constructor(passwordService = new PasswordService()) {
    super();
    this.passwordService = passwordService;
  }

  async find(username: string) {
    const db = await this.getDb();

    return db.user.findUnique({ where: { username } });
  }

  async createUser(username: string, password: string) {
    const db = await this.getDb();
    const { salt, hash } = this.passwordService.hash(password);

    return db.user.create({
      data: {
        username,
        password_salt: salt,
        password_digest: hash,
      },
    });
  }
}
