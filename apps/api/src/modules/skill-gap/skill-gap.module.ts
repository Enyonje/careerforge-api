import { Module } from '@nestjs/common';
import { SkillGapService } from './skill-gap.service';
import { SkillGapController } from './skill-gap.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule], // ✅ REQUIRED
  controllers: [SkillGapController],
  providers: [SkillGapService],
})
export class SkillGapModule {}
