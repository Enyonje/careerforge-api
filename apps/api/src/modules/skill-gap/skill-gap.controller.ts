// skill-gap.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { SkillGapService } from './skill-gap.service';

@Controller('skill-gap')
export class SkillGapController {
  constructor(private readonly skillGapService: SkillGapService) {}

  @Post()
  async calculateGap(@Body() body: { userId?: string; email?: string }) {
    return this.skillGapService.calculateGap(body);
  }
}