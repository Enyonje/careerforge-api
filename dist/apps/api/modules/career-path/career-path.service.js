"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareerPathService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const recommendations_service_1 = require("../recommendations/recommendations.service");
let CareerPathService = class CareerPathService {
    constructor(prisma, recommendations) {
        this.prisma = prisma;
        this.recommendations = recommendations;
    }
    async findCareerPath({ email, userId, }) {
        if (!email && !userId) {
            throw new common_1.BadRequestException('userId or email is required');
        }
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
            throw new common_1.BadRequestException('User not found');
        }
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
        const userSkillMap = new Map();
        for (const us of user.skills) {
            userSkillMap.set(us.skillId, us.level);
        }
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
                .filter((s) => s !== null);
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
};
exports.CareerPathService = CareerPathService;
exports.CareerPathService = CareerPathService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        recommendations_service_1.RecommendationsService])
], CareerPathService);
//# sourceMappingURL=career-path.service.js.map