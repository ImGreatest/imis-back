import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateSuccess } from './interface/create.success.interface';
import { IUpdateSuccess } from './interface/update.success.interface';
import { IFilter } from 'libs/shared/interface/filter.interface';
import { IOrder } from 'libs/shared/interface/order.interface';
@Injectable()
export class SuccessService {
  constructor(private prisma: PrismaService) {}

  async create(success: ICreateSuccess) {
    const tags = success.tags;
    delete success.tags;
    const createdSuccess = await this.prisma.success.create({
      data: {
        userId: success.userId,
        name: success.name,
        description: success.description,
      },
    });
    await this.deleteAddTags(createdSuccess.id, tags);
    return createdSuccess;
  }
  async getPage(
    filters: IFilter[] = [],
    page: number,
    limit: number,
    orderProps: IOrder,
  ) {
    let whereOptions = {};
    filters.forEach((filter) => {
      whereOptions = { ...whereOptions, [filter.column]: filter.value };
    });
    const offset = (page - 1) * limit;
    const pageCount = await this.prisma.success.count();
    const success = await this.prisma.success.findMany({
      where: whereOptions,
      select: {
        id: true,
        name: true,
        description: true,
        tags: { select: { tag: { select: { id: true, name: true } } } },
        user: {
          select: {
            name: true,
            surname: true,
            direction: { select: { name: true } },
            group: { select: { name: true } },
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: orderProps,
    });
    return {
      info: {
        page: page,
        pageSize: limit,
        totalCount: pageCount,
        totalPages: Math.ceil(pageCount / limit),
      },
      rows: success,
    };
  }
  async getById(id: number) {
    return this.prisma.success.findUnique({
      where: { id: id },
      include: { tags: { include: { tag: true } }, user: true },
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
