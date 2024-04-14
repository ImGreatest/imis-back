import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateTag } from './interface/create.tag.interface';
import { IUpdateTag } from './interface/update.tag.interface';
@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(tag: ICreateTag) {
    return this.prisma.tag.create({
      data: tag,
    });
  }
  async getTagsTree(ratingId: number) {
    const baseTags = await this.prisma.tag.findMany({
      where: { baseTagId: null, deletedAt: null },
      select: {
        id: true,
        name: true,
        description: true,
        childTags: true,
        ratingScope: {
          where: { ratingId: ratingId },
          select: { ratingScore: true },
        },
      },
    });

    const fetchChildrenRecursively = async (tag) => {
      if (tag.childTags.length > 0) {
        const childTagsWithChildren = await Promise.all(
          tag.childTags.map(async (childTag) => {
            const tagWithChildren = await this.prisma.tag.findUnique({
              where: { id: childTag.id, deletedAt: null },
              select: {
                id: true,
                name: true,
                description: true,
                childTags: true,
                ratingScope: {
                  where: { ratingId: ratingId },
                  select: { ratingScore: true },
                },
              },
            });
            return fetchChildrenRecursively(tagWithChildren);
          }),
        );
        return {
          ...tag,
          childTags: childTagsWithChildren,
        };
      } else {
        return tag;
      }
    };

    const baseTagsWithChildren = await Promise.all(
      baseTags.map(async (tag) => {
        return fetchChildrenRecursively(tag);
      }),
    );

    return baseTagsWithChildren;
  }

  async getList() {
    const tags = await this.prisma.tag.findMany({
      where: { childTags: { none: {} }, deletedAt: null },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return tags;
  }
  async getById(id: number) {
    return this.prisma.tag.findUnique({
      where: { id: id },
    });
  }
  async update(id: number, tag: IUpdateTag) {
    return this.prisma.tag.update({
      where: { id: id },
      data: tag,
    });
  }

  async delete(id: number) {
    return this.prisma.tag.delete({
      where: { id: id },
    });
  }
}
