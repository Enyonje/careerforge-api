"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiRecommendationService = void 0;
const common_1 = require("@nestjs/common");
let AiRecommendationService = class AiRecommendationService {
    async generateRecommendations(input) {
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
            estimatedDurationMonths: Math.max(3, input.missingSkills.length * 2),
        };
    }
};
exports.AiRecommendationService = AiRecommendationService;
exports.AiRecommendationService = AiRecommendationService = __decorate([
    (0, common_1.Injectable)()
], AiRecommendationService);
//# sourceMappingURL=ai-recommendation.service.js.map