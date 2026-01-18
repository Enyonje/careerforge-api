import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { PrismaService } from '../../database/prisma.service';

@Module({
  providers: [RecommendationsService, PrismaService],
  exports: [RecommendationsService],
})
export class RecommendationsModule {}
