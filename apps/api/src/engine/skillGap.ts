import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type SkillGapResult = {
  skillId: string;
  skillName: string;
  requiredLevel: number;
  currentLevel: number;
  gap: number;
};

export type SkillGapSummary = {
  readinessScore: number; // 0 – 100
  gaps: SkillGapResult[];
};

export async function calculateSkillGap(
  userSkills: { skillId: string; level: number }[],
  targetRoleId: string
): Promise<SkillGapSummary> {
  // Fetch required skills for the role
  const roleSkills = await prisma.roleSkill.findMany({
    where: { roleId: targetRoleId },
    include: { skill: true }
  });

  let totalRequired = 0;
  let totalCovered = 0;

  const gaps: SkillGapResult[] = [];

  for (const rs of roleSkills) {
    const required = rs.requiredLevel;
    totalRequired += required;

    const userSkill = userSkills.find(
      us => us.skillId === rs.skillId
    );

    const current = userSkill?.level ?? 0;
    totalCovered += Math.min(current, required);

    if (current < required) {
      gaps.push({
        skillId: rs.skillId,
        skillName: rs.skill.name,
        requiredLevel: required,
        currentLevel: current,
        gap: required - current
      });
    }
  }

  const readinessScore =
    totalRequired === 0
      ? 100
      : Math.round((totalCovered / totalRequired) * 100);

  return {
    readinessScore,
    gaps
  };
}
