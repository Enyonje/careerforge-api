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
exports.SkillGapService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let SkillGapService = class SkillGapService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calculateGap(body) {
        let user;
        if (body.userId) {
            user = await this.prisma.user.findUnique({ where: { id: body.userId } });
        }
        else if (body.email) {
            user = await this.prisma.user.findUnique({ where: { email: body.email } });
        }
        if (!user) {
            return { error: 'User not found' };
        }
        const userSkills = await this.prisma.userSkill.findMany({
            where: { userId: user.id },
        });
        const userRoles = await this.prisma.userRole.findMany({
            where: { userId: user.id },
            include: { role: { include: { skills: true } } },
        });
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
};
exports.SkillGapService = SkillGapService;
exports.SkillGapService = SkillGapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SkillGapService);
//# sourceMappingURL=skill-gap.service.js.map