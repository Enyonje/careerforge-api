"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSkillGap = calculateSkillGap;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function calculateSkillGap(userSkills, targetRoleId) {
    const roleSkills = await prisma.roleSkill.findMany({
        where: { roleId: targetRoleId },
        include: { skill: true }
    });
    let totalRequired = 0;
    let totalCovered = 0;
    const gaps = [];
    for (const rs of roleSkills) {
        const required = rs.requiredLevel;
        totalRequired += required;
        const userSkill = userSkills.find(us => us.skillId === rs.skillId);
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
    const readinessScore = totalRequired === 0
        ? 100
        : Math.round((totalCovered / totalRequired) * 100);
    return {
        readinessScore,
        gaps
    };
}
//# sourceMappingURL=skillGap.js.map