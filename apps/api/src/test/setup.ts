import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  // Clean DB after every test
  await prisma.userRole.deleteMany();
  await prisma.roleSkill.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.role.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
