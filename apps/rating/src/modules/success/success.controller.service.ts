import { Injectable } from '@nestjs/common';
import { ICreateSuccess } from 'libs/domains/success/interface/create.success';
import { IUpdateSuccess } from 'libs/domains/success/interface/update.success';
import { SuccessService } from 'libs/domains/success/success.service';

@Injectable()
export class SuccessControllerService {
  constructor(private successService: SuccessService) {}
  async create(user: ICreateSuccess) {
    return this.successService.create(user);
  }
  async getPage(limit: number, page: number) {
    return this.successService.getPage(limit, page);
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
}
