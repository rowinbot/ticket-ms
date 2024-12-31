import { QuestionOption } from "@prisma/client";
import { AppService } from "../utils/app-service.ts";

export class QuestionService extends AppService {
  async getMatchQuestions(size = 5) {
    const db = await this.getDb();

    // Easily adaptable to other databases
    const ids = await db.$queryRawUnsafe<{ id: number }[]>(
      `SELECT id
       FROM Question
       ORDER BY RANDOM()
           LIMIT ${size};`,
    );

    const list = db.question.findMany({
      where: {
        id: {
          in: ids.map(({ id }) => id),
        },
      },
      include: {
        options: true,
      },
    });

    return list;
  }

  async createQuestion(
    question: string,
    options: Pick<QuestionOption, "value" | "isCorrect">,
  ) {
    const db = await this.getDb();

    return db.question.create({
      data: {
        question,
        options: {
          createMany: {
            data: options,
          },
        },
      },
      include: {
        options: true,
      },
    });
  }
}
