import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { SkillTypeRepository } from 'libs/domains/skill/repositories/skill-type.repository';
import { IResSkillTypeDto } from 'libs/domains/skill/dto/res-dto/res-skill-type.dto';
import { IResSkillTypeFindAllDto } from 'libs/domains/skill/dto/res-dto/res-skill-type-find-all.dto';

@Injectable()
export class SkillTypeAdapter extends SkillTypeRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<IResSkillTypeFindAllDto[]> {
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

  async createSkillType(skillType: string): Promise<IResSkillTypeDto> {
    return this.prisma.skillType.create({ data: { name: skillType } });
  }

  async deleteSkillType(id: number): Promise<IResSkillTypeDto> {
    return this.prisma.skillType.delete({ where: { id: id } });
  }
}
