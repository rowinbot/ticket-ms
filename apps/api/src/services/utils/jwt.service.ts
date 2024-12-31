import { AppService } from "../../utils/app-service.ts";
import { AppConfig } from "../../utils/config.ts";
import jwt from "jsonwebtoken";
import ms from "ms";

export class InvalidTokenError extends Error {}

export class JwtService extends AppService {
  private readonly appConfig: AppConfig;

  constructor(appConfig: AppConfig) {
    super();
    this.appConfig = appConfig;
  }

  public async createToken(tokenData: jwt.JwtPayload): Promise<string> {
    const token = jwt.sign(tokenData, this.appConfig.auth.jwtSecret, {
      expiresIn: ms("1w"),
    });

    return token;
  }

  public async verifyToken(token: string): Promise<jwt.JwtPayload> {
    const result = jwt.verify(token, this.appConfig.auth.jwtSecret);

    if (typeof result === "string") {
      throw new InvalidTokenError();
    }

    return result;
  }
}
