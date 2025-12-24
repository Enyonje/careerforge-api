import { PrismaClient } from '@prisma/client';
import { calculateSkillGap } from './skillGap';

const prisma = new PrismaClient();

type PathStep = {
  roleId: string;
  roleName: string;
  readinessScore: number;
};

type CareerPathResult = {
  path: PathStep[];
  totalSteps: number;
};

export async function findCareerPath(
  userSkills: { skillId: string; level: number }[],
  startRoleId: string,
  targetRoleId: string
): Promise<CareerPathResult> {
  // Breadth-first search (BFS)
  const queue: string[][] = [[startRoleId]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const currentPath = queue.shift()!;
    const currentRoleId = currentPath[currentPath.length - 1];

    // If we reached the target role, build the path details
    if (currentRoleId === targetRoleId) {
      const pathDetails: PathStep[] = [];

      for (const roleId of currentPath) {
        const role = await prisma.role.findUnique({
          where: { id: roleId },
        });

        if (!role) continue;

        const gap = await calculateSkillGap(userSkills, roleId);

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

    if (visited.has(currentRoleId)) continue;
    visited.add(currentRoleId);

    // Fetch the current role to determine next possible roles
    const currentRole = await prisma.role.findUnique({
      where: { id: currentRoleId },
    });

    if (!currentRole) continue;

    // Find next roles in the same domain with higher level
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