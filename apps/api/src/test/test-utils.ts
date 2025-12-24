import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  // Clean tables in correct order
  await prisma.userRole.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.roleSkill.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.skill.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
