import { Controller, Get, Query } from '@nestjs/common';
import { CareerPathService } from './career-path.service';

@Controller('career-path')
export class CareerPathController {
  constructor(private readonly careerPathService: CareerPathService) {}

  @Get()
  async getCareerPath(
    @Query('email') email?: string,
    @Query('userId') userId?: string,
  ) {
    return this.careerPathService.findCareerPath({ email, userId });
  }
}
