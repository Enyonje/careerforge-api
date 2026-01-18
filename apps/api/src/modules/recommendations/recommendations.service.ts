import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class RecommendationsService {
  constructor(private readonly prisma: PrismaService) {}

  async generateRecommendations(input: {
    roleTitle: string;
    missingSkills: { skill: string; gap: number }[];
  }) {
    // 🔮 Placeholder AI logic (safe for prod)
    // You can later swap this for OpenAI / Gemini / etc.

    return {
      targetRole: input.roleTitle,
      recommendations: input.missingSkills.map((s) => ({
        skill: s.skill,
        action: `Improve ${s.skill} by ${s.gap} level(s)`,
        suggestedResources: [
          'Online course',
          'Hands-on project',
          'Mentorship',
        ],
      })),
    };
  }
}
