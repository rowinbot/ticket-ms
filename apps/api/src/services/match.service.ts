import { AppService } from "../utils/app-service.ts";

export class MatchService extends AppService {
  async createMatch(winnerUsername: string | null) {
    const db = await this.getDb();

    if (winnerUsername) {
      return db.match.create({
        data: {
          winner: {
            connect: {
              username: winnerUsername,
            },
          },
        },
      });
    } else {
      return db.match.create({
        data: {},
      });
    }
  }
}
