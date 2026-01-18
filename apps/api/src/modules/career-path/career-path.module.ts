import { Module } from '@nestjs/common';
import { CareerPathService } from './career-path.service';
import { CareerPathController } from './career-path.controller';
import { RecommendationsModule } from '../recommendations/recommendations.module'; // Adjust path as needed
import { PrismaService } from '../../database/prisma.service';

@Module({
  imports: [RecommendationsModule], // <--- ADD THIS LINE
  controllers: [CareerPathController],
  providers: [CareerPathService, PrismaService],
})
export class CareerPathModule {}