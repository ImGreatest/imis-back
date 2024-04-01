import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateSuccess } from './interface/create.success';
import { IUpdateSuccess } from './interface/update.success';
@Injectable()
export class SuccessService {
  constructor(private prisma: PrismaService) {}

  async create(success: ICreateSuccess) {
    const tags = success.tags;
    delete success.tags;
    return this.prisma.success.create({
      data: {
        userId: success.userId,
        name: success.name,
        description: success.description,
        tags: { create: tags.map((tag) => ({ tagId: tag })) },
      },
    });
  }
  async getPage(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const pageCount = await this.prisma.success.count();
    const success = await this.prisma.success.findMany({
      take: limit,
      skip: offset,
    });
    return {
      info: {
        page: page,
        pageSize: limit,
        totalCount: pageCount,
        totalPages: Math.ceil(pageCount / limit),
      },
      content: success,
    };
  }
  async getById(id: number) {
    return this.prisma.success.findUnique({
      where: { id: id },
      include: { tags: { include: { tag: true } } },
    });
  }
  async update(id: number, success: IUpdateSuccess) {
    return this.prisma.success.update({
      where: { id: id },
      data: success,
    });
  }

  async delete(id: number) {
    return this.prisma.success.delete({
      where: { id: id },
    });
  }
  async deleteAddTags(successId: number, tagsIds: number[]) {
    const curTags = await this.prisma.successTags.findMany({
      where: { successId: successId },
      select: { tagId: true },
    });
    const toCreate = tagsIds.filter((tagId) => {
      return curTags.includes({ tagId: tagId }) === false;
    });
    console.log(curTags, toCreate, tagsIds);
    const toDelete = curTags.filter((tag) => {
      return !tagsIds.includes(tag.tagId);
    });

    await this.prisma.successTags.deleteMany({
      where: {
        successId: successId,
        tagId: { in: toDelete.map((tag) => tag.tagId) },
      },
    });

    return this.prisma.successTags.createMany({
      data: toCreate.map((tagId) => ({
        successId: successId,
        tagId: tagId,
      })),
    });
  }
}
