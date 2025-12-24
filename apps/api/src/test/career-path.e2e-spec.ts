import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma/client';

describe('CareerPathController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();

    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('❌ should fail when no query params provided', async () => {
    await request(app.getHttpServer())
      .get('/v1/career-path')
      .expect(400);
  });

  it('❌ should fail when user not found', async () => {
    await request(app.getHttpServer())
      .get('/v1/career-path?email=missing@example.com')
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe('User not found');
      });
  });

  it('✅ should return career path with AI recommendations', async () => {
    // Seed data
    const skill = await prisma.skill.create({
      data: {
        name: 'SQL',
        category: 'Backend',
      },
    });

    const role = await prisma.role.create({
      data: {
        title: 'Backend Developer',
        domain: 'Engineering',
        level: 2,
        seniority: 'MID',
      },
    });

    await prisma.roleSkill.create({
      data: {
        roleId: role.id,
        skillId: skill.id,
        requiredLevel: 3,
      },
    });

    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        fullName: 'Test User',
      },
    });

    await prisma.userSkill.create({
      data: {
        userId: user.id,
        skillId: skill.id,
        level: 1,
      },
    });

    const res = await request(app.getHttpServer())
      .get(`/v1/career-path?email=${user.email}`)
      .expect(200);

    expect(res.body).toHaveProperty('careerPath');
    expect(res.body).toHaveProperty('recommendedNextRole');
    expect(res.body).toHaveProperty('aiRecommendations');

    expect(res.body.aiRecommendations).toHaveProperty('summary');
    expect(Array.isArray(res.body.aiRecommendations.actions)).toBe(true);
  });
});
