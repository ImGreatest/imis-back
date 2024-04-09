import { Injectable } from '@nestjs/common';
import { ICreateTag } from 'libs/domains/tag/interface/create.tag.interface';
import { IUpdateTag } from 'libs/domains/tag/interface/update.tag.interface';
import { TagService } from 'libs/domains/tag/tag.service';

@Injectable()
export class TagControllerService {
  constructor(private tagService: TagService) {}
  async create(user: ICreateTag) {
    return this.tagService.create(user);
  }
  async getPage(limit: number, page: number) {
    return this.tagService.getPage(limit, page);
  }
  async getById(id: number) {
    return this.tagService.getById(id);
  }
  async update(id: number, tag: IUpdateTag) {
    return this.tagService.update(id, tag);
  }

  async delete(id: number) {
    return this.tagService.delete(id);
  }
}
