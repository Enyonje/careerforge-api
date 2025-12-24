// skill-gap.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SkillGapService {
  constructor(private prisma: PrismaService) {}

  async calculateGap(body: { userId?: string; email?: string }) {
    let user;

    if (body.userId) {
      user = await this.prisma.user.findUnique({ where: { id: body.userId } });
    } else if (body.email) {
      user = await this.prisma.user.findUnique({ where: { email: body.email } });
    }

    if (!user) {
      return { error: 'User not found' };
    }

    // Load user skills
    const userSkills = await this.prisma.userSkill.findMany({
      where: { userId: user.id },
    });

    // Load role(s) for this user
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId: user.id },
      include: { role: { include: { skills: true } } },
    });

    // Compare user skills vs role requirements
    const gaps = [];
    for (const userRole of userRoles) {
      for (const roleSkill of userRole.role.skills) {
        const userSkill = userSkills.find((s) => s.skillId === roleSkill.skillId);
        const currentLevel = userSkill?.level ?? 0;

        if (currentLevel < roleSkill.requiredLevel) {
          gaps.push({
            role: userRole.role.title,
            skill: roleSkill.skillId,
            requiredLevel: roleSkill.requiredLevel,
            currentLevel,
          });
        }
      }
    }

    return gaps;
  }
}