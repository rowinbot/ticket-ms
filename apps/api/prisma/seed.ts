import { PrismaClient } from "@prisma/client";
import type { Event } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

faker.company.name();

const events: Omit<Event, "id" | "updated_at" | "created_at">[] = Array.from(
  { length: 100 },
  () => ({
    title: faker.company.name(),
    description: faker.lorem.paragraph(5),
    short_description: faker.lorem.paragraph(2),
    location: faker.location.city(),
    date: faker.date.between({
      from: new Date(),
      to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    }),
  }),
);

const clampRandom = (min: number, max: number) =>
  Math.min(Math.max(Math.floor(Math.random() * max), min), max);

async function main() {
  await Promise.all(
    events.map(async (event) => {
      const result = await prisma.event.create({
        data: {
          ...event,
        },
      });

      const tickets = clampRandom(10, 100);

      for (let i = 0; i < tickets; i++) {
        await prisma.eventTicket.create({
          data: { event_id: result.id },
        });
      }

      console.log(`Seeded event: ${event.title} with ${tickets} tickets`);
    }),
  );

  console.log("Seeded events");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
