import { Injectable } from '@nestjs/common';
import { SkillRepository } from 'libs/domains/skill/repositories/skill.repository';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { IResFindAllFromUserDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-user.dto';
import { ICreateSkill } from 'libs/domains/skill/dto/req-dto/req-create-skill.dto';
import { IResCreateSkillDto } from 'libs/domains/skill/dto/res-dto/res-create-skill.dto';
import { IResFindAllFromProjectDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-project.dto';

@Injectable()
export class SkillsAdapter extends SkillRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findAllFromUser(userId: number): Promise<IResFindAllFromUserDto[]> {
    const users = await this.prisma.user.findMany({
      where: { id: userId },
      select: {
        userSkils: {
          select: { skils: { select: { id: true, name: true } } },
        },
      },
    });

    return users.map((user) => ({
      userSkils: user.userSkils.map((userSkil) => ({
        skills: userSkil.skils,
      })),
    }));
  }

  async findAllFromProject(
    projectId: number,
  ): Promise<IResFindAllFromProjectDto[]> {
    return this.prisma.project.findMany({
      where: { id: projectId },
      select: {
        projectSkils: {
          select: { skils: { select: { id: true, name: true } } },
        },
      },
    });
  }

  async create(skill: ICreateSkill): Promise<IResCreateSkillDto> {
    return this.prisma.skills.create({ data: skill });
  }

  async delete(id: number): Promise<IResCreateSkillDto> {
    return this.prisma.skills.delete({ where: { id: id } });
  }
}
