import { Injectable } from '@nestjs/common';

export interface CareerNode {
  roleId: string;
  title: string;
  level: string;
  domain: string;
  requiredSkills: { skillId: string; requiredLevel: number }[];
  nextRoles: string[];
}

@Injectable()
export class CareerGraphBuilder {
  /**
   * Builds a career path graph from roles and their required skills.
   * Each node contains role info and possible next roles (by level/domain).
   */
  buildGraph(roles: CareerNode[]): Record<string, CareerNode> {
    const graph: Record<string, CareerNode> = {};
    for (const role of roles) {
      // Find next roles by higher level in same domain
      role.nextRoles = roles
        .filter(r => r.domain === role.domain && r.level !== role.level && r.level > role.level)
        .map(r => r.roleId);
      graph[role.roleId] = role;
    }
    return graph;
  }
}