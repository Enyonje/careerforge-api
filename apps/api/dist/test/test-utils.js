"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
beforeAll(async () => {
    await prisma.$connect();
});
afterEach(async () => {
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
//# sourceMappingURL=test-utils.js.map