import prisma from "../../src/utils/prismaClient";

export async function seedUser() {
  console.log("Seeding Users...");

  const users = [
    {
      name: "Test",
      email: "test@test.com",
      password: await Bun.password.hash("test1234", {
        algorithm: "bcrypt",
        cost: 10,
      }),
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("Users Seeded!");
}
