"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCareerPath = findCareerPath;
const client_1 = require("@prisma/client");
const skillGap_1 = require("./skillGap");
const prisma = new client_1.PrismaClient();
async function findCareerPath(userSkills, startRoleId, targetRoleId) {
    const queue = [[startRoleId]];
    const visited = new Set();
    while (queue.length > 0) {
        const currentPath = queue.shift();
        const currentRoleId = currentPath[currentPath.length - 1];
        if (currentRoleId === targetRoleId) {
            const pathDetails = [];
            for (const roleId of currentPath) {
                const role = await prisma.role.findUnique({
                    where: { id: roleId },
                });
                if (!role)
                    continue;
                const gap = await (0, skillGap_1.calculateSkillGap)(userSkills, roleId);
                pathDetails.push({
                    roleId,
                    roleName: role.title,
                    readinessScore: gap.readinessScore,
                });
            }
            return {
                path: pathDetails,
                totalSteps: pathDetails.length,
            };
        }
        if (visited.has(currentRoleId))
            continue;
        visited.add(currentRoleId);
        const currentRole = await prisma.role.findUnique({
            where: { id: currentRoleId },
        });
        if (!currentRole)
            continue;
        const nextRoles = await prisma.role.findMany({
            where: {
                domain: currentRole.domain,
                level: { gt: currentRole.level },
            },
        });
        for (const next of nextRoles) {
            queue.push([...currentPath, next.id]);
        }
    }
    throw new Error('No career path found');
}
//# sourceMappingURL=careerPath.js.map