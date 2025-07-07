const { PrismaClient } = require("@prisma/client");
const admins = require("./admins.json");
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

async function main() {
  for (const admin of admins) {
    const existingEmail = await prisma.admin.findUnique({
      where: { email: admin.email },
    });
    if (existingEmail) {
      console.log(
        `⚠️ Admin with email ${admin.email} already exists. Skipping...`
      );
      continue;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(admin.password, salt);

    await prisma.admin.create({
      data: {
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
        category: admin.category,
      },
    });
    console.log(
      `✅ Seeded admin: ${admin.email} (category: ${admin.category})`
    );
  }
}
main()
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
