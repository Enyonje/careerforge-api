import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SkillsModule } from './modules/skills/skills.module';
import { RolesModule } from './modules/roles/roles.module';
import { SkillGapModule } from './modules/skill-gap/skill-gap.module';
import { CareerPathModule } from './modules/career-path/career-path.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    DatabaseModule,
    HealthModule,

    AuthModule,
    UsersModule,
    SkillsModule,
    RolesModule,
    SkillGapModule,
    CareerPathModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
