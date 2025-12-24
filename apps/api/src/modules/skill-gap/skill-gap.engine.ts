export class SkillGapEngine {
  /**
   * Calculates skill gaps between user's current skills and target role's required skills.
   * Returns an array of missing or insufficient skills with gap details.
   */
  calculate(currentSkills: { skillId: string; level: number }[], targetSkills: { skillId: string; requiredLevel: number }[]) {
    return targetSkills.map((target) => {
      const current = currentSkills.find((c) => c.skillId === target.skillId);
      const gap = !current ? target.requiredLevel : Math.max(0, target.requiredLevel - current.level);
      return {
        skillId: target.skillId,
        requiredLevel: target.requiredLevel,
        currentLevel: current ? current.level : 0,
        gap,
        hasGap: gap > 0,
      };
    }).filter((result) => result.hasGap);
  }
}
