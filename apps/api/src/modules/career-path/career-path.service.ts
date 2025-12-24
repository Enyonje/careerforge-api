import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RecommendationsService } from '../recommendations/recommendations.service';

@Injectable()
export class CareerPathService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly recommendations: RecommendationsService,
  ) {}

  async findCareerPath({
    email,
    userId,
  }: {
    email?: string;
    userId?: string;
  }) {
    if (!email && !userId) {
      throw new BadRequestException('userId or email is required');
    }

    // 1️⃣ Find user
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: userId }, { email }],
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 2️⃣ Load roles + required skills
    const roles = await this.prisma.role.findMany({
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
      orderBy: { level: 'asc' },
    });

    // 3️⃣ Build user skill map
    const userSkillMap = new Map<string, number>();
    for (const us of user.skills) {
      userSkillMap.set(us.skillId, us.level);
    }

    // 4️⃣ Evaluate career path
    const careerPath = roles.map((role) => {
      const missingSkills = role.skills
        .map((rs) => {
          const userLevel = userSkillMap.get(rs.skillId) ?? 0;

          if (userLevel < rs.requiredLevel) {
            return {
              skillId: rs.skillId,
              skill: rs.skill.name,
              requiredLevel: rs.requiredLevel,
              currentLevel: userLevel,
              gap: rs.requiredLevel - userLevel,
            };
          }

          return null;
        })
        .filter(
          (
            s,
          ): s is {
            skillId: string;
            skill: string;
            requiredLevel: number;
            currentLevel: number;
            gap: number;
          } => s !== null,
        );

      return {
        roleId: role.id,
        title: role.title,
        domain: role.domain,
        level: role.level,
        seniority: role.seniority,
        missingSkills,
        isEligible: missingSkills.length === 0,
      };
    });

    // 5️⃣ Recommend next achievable role
    const nextRole = careerPath.find((r) => !r.isEligible) ?? null;

    let aiRecommendations = null;

    if (nextRole && nextRole.missingSkills.length > 0) {
      aiRecommendations =
        await this.recommendations.generateRecommendations({
          roleTitle: nextRole.title,
          missingSkills: nextRole.missingSkills.map((s) => ({
            skill: s.skill,
            gap: s.gap,
          })),
        });
    }

    // 6️⃣ Final response
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      currentSkills: user.skills.map((s) => ({
        name: s.skill.name,
        level: s.level,
      })),
      careerPath,
      recommendedNextRole: nextRole,
      aiRecommendations,
    };
  }
}
