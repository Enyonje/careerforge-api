"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillGapEngine = void 0;
class SkillGapEngine {
    calculate(currentSkills, targetSkills) {
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
exports.SkillGapEngine = SkillGapEngine;
//# sourceMappingURL=skill-gap.engine.js.map