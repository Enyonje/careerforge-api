"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillGapEngine = void 0;
var SkillGapEngine = /** @class */ (function () {
    function SkillGapEngine() {
    }
    /**
     * Calculates skill gaps between user's current skills and target role's required skills.
     * Returns an array of missing or insufficient skills with gap details.
     */
    SkillGapEngine.prototype.calculate = function (currentSkills, targetSkills) {
        return targetSkills.map(function (target) {
            var current = currentSkills.find(function (c) { return c.skillId === target.skillId; });
            var gap = !current ? target.requiredLevel : Math.max(0, target.requiredLevel - current.level);
            return {
                skillId: target.skillId,
                requiredLevel: target.requiredLevel,
                currentLevel: current ? current.level : 0,
                gap: gap,
                hasGap: gap > 0,
            };
        }).filter(function (result) { return result.hasGap; });
    };
    return SkillGapEngine;
}());
exports.SkillGapEngine = SkillGapEngine;
