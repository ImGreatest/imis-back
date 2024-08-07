import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateTag } from './interface/create.tag.interface';
import { IUpdateTag } from './interface/update.tag.interface';
import { ITreeTag } from './interface/tags.tree.interface';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(tag: ICreateTag) {
    return this.prisma.tag.create({
      data: tag,
    });
  }
  async getTagsTree(ratingId: number): Promise<ITreeTag> {
    const allTags = await this.prisma.tag.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        baseTagId: true,
        description: true,
        ratingScope: {
          where: { ratingId: ratingId },
          select: { ratingScore: true },
        },
      },
    });

    const baseTags = allTags.filter((tag) => !tag.baseTagId);

    const tagWithChild = baseTags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      description: tag.description,
      ratingScope: tag.ratingScope && tag.ratingScope[0]?.ratingScore,
      childTags: this.recurse(tag, allTags),
    }));

    const rating = await this.prisma.rating.findUnique({
      where: { id: ratingId },
    });

    const ratingName = rating?.name || '';
    const hourlyUpdate = rating?.minuteUpdate || 0;
    const scoringType = rating?.scoringType || 'average';

    return {
      ratingName: ratingName,
      hourlyUpdate: hourlyUpdate,
      scoringType: scoringType,
      tag: tagWithChild,
      default: rating.default,
    };
  }

  recurse(tag, allTags) {
    const children = allTags.filter((child) => child.baseTagId === tag.id);
    return children.map((child) => ({
      id: child.id,
      name: child.name,
      description: child.description,
      ratingScope: child.ratingScope && child.ratingScope[0]?.ratingScore,
      childTags: this.recurse(child, allTags),
    }));
  }

  async getList() {
    return this.prisma.tag.findMany({
      where: { childTags: { none: {} }, deletedAt: null },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }
  getAll() {
    return this.prisma.tag.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }
  async getById(id: number) {
    const tag = await this.prisma.tag.findUnique({
      where: { id: id },
    });

    if (!tag) {
      // Обработка случая, когда запись не найдена
      console.error(`Tag with id ${id} not found`);
      throw new NotFoundException(`Такого тега нет`);
    }

    return tag;
  }
  async update(id: number, tag: IUpdateTag) {
    try {
      const updatedTag = await this.prisma.tag.update({
        where: { id: id },
        data: tag,
      });
      return updatedTag;
    } catch (error) {
      console.error('Failed to update tag:', error);
      throw new NotFoundException('Такого тега нет');
    }
  }

  async delete(id: number) {
    return this.prisma.tag.delete({
      where: { id: id },
    });
  }
}
