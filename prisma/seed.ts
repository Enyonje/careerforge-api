import { PrismaClient, RoleSeniority } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean DB (order matters because of relations)
  await prisma.userRole.deleteMany();
  await prisma.roleSkill.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.role.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  // USER
  const user = await prisma.user.create({
    data: {
      email: 'test@careerforge.dev',
      fullName: 'Test User',
    },
  });

  // SKILLS
  const skills = await prisma.skill.createMany({
    data: [
      { name: 'JavaScript', category: 'Backend' },
      { name: 'TypeScript', category: 'Backend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'NestJS', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
    ],
  });

  const allSkills = await prisma.skill.findMany();

  // USER SKILL LEVELS
  for (const skill of allSkills) {
    await prisma.userSkill.create({
      data: {
        userId: user.id,
        skillId: skill.id,
        level: Math.floor(Math.random() * 3) + 2, // 2–4
      },
    });
  }

  // ROLES
  const juniorRole = await prisma.role.create({
    data: {
      title: 'Backend Developer',
      domain: 'Backend',
      level: 1,
      seniority: RoleSeniority.JUNIOR,
    },
  });

  const midRole = await prisma.role.create({
    data: {
      title: 'Backend Developer',
      domain: 'Backend',
      level: 2,
      seniority: RoleSeniority.MID,
    },
  });

  const seniorRole = await prisma.role.create({
    data: {
      title: 'Backend Developer',
      domain: 'Backend',
      level: 3,
      seniority: RoleSeniority.SENIOR,
    },
  });

  // ROLE → SKILL REQUIREMENTS
  for (const skill of allSkills) {
    await prisma.roleSkill.createMany({
      data: [
        {
          roleId: juniorRole.id,
          skillId: skill.id,
          requiredLevel: 2,
        },
        {
          roleId: midRole.id,
          skillId: skill.id,
          requiredLevel: 3,
        },
        {
          roleId: seniorRole.id,
          skillId: skill.id,
          requiredLevel: 4,
        },
      ],
    });
  }

  // USER CURRENT ROLE
  await prisma.userRole.create({
    data: {
      userId: user.id,
      roleId: juniorRole.id,
    },
  });

  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
