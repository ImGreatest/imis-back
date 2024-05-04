import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateSkill } from './interface/req.create.interface';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.skillType.findMany({
      select: {
        id: true,
        name: true,
        skills: {
          select: { id: true, name: true },
        },
      },
    });
  }
  findAllFromUser(userId: number) {
    return this.prisma.user.findMany({
      where: { id: userId },
      select: {
        userSkils: {
          select: { skils: { select: { id: true, name: true } } },
        },
      },
    });
  }

  findAllFromProject(projectId: number) {
    return this.prisma.project.findMany({
      where: { id: projectId },
      select: {
        projectSkils: {
          select: { skils: { select: { id: true, name: true } } },
        },
      },
    });
  }

  create(skill: ICreateSkill) {
    return this.prisma.skills.create({ data: skill });
  }

  createSkillType(skillType: string) {
    return this.prisma.skillType.create({ data: { name: skillType } });
  }

  delete(id: number) {
    return this.prisma.skills.delete({ where: { id: id } });
  }
  deleteSkillType(id: number) {
    return this.prisma.skillType.delete({ where: { id: id } });
  }
}
