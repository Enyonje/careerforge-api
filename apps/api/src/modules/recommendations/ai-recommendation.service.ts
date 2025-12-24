import { Injectable } from '@nestjs/common';

@Injectable()
export class AiRecommendationService {
  async generateRecommendations(input: {
    roleTitle: string;
    missingSkills: {
      skill: string;
      gap: number;
    }[];
  }) {
    // ⚠️ Placeholder logic (NO external API yet)
    // This keeps your app stable and testable

    const actions = input.missingSkills.map((s) => ({
      skill: s.skill,
      recommendation: `Improve ${s.skill} by ${s.gap} level(s) using hands-on projects and tutorials.`,
      resources: [
        `Intro to ${s.skill}`,
        `${s.skill} Practical Guide`,
      ],
    }));

    return {
      summary: `To become a ${input.roleTitle}, focus on closing the following skill gaps.`,
      actions,
      estimatedDurationMonths: Math.max(
        3,
        input.missingSkills.length * 2,
      ),
    };
  }
}
