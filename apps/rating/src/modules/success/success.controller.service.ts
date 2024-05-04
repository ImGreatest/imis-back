import { Injectable } from '@nestjs/common';
import { ICreateSuccess } from 'libs/domains/success/interface/create.success.interface';
import { IUpdateSuccess } from 'libs/domains/success/interface/update.success.interface';
import { SuccessService } from 'libs/domains/success/success.service';
import { IFilter } from 'libs/shared/interface/filter.interface';
import { IOrder } from 'libs/shared/interface/order.interface';

@Injectable()
export class SuccessControllerService {
  constructor(private successService: SuccessService) {}
  async create(createrId: number, user: ICreateSuccess) {
    return this.successService.create(createrId, user);
  }
  async getPage(
    filters: IFilter[] = [],
    page: number,
    limit: number,
    orderProps: IOrder,
  ) {
    return this.successService.getPage(filters, page, limit, orderProps);
  }
  async getById(id: number) {
    return this.successService.getById(id);
  }
  async update(id: number, success: IUpdateSuccess) {
    return this.successService.update(id, success);
  }

  async delete(id: number) {
    return this.successService.delete(id);
  }
  async deleteAddTags(successId: number, tagsIds: number[]) {
    return this.successService.deleteAddTags(successId, tagsIds);
  }
}
