import { Injectable } from '@nestjs/common';
import { ICreateTag } from 'libs/domains/tag/interface/create.tag.interface';
import { IUpdateTag } from 'libs/domains/tag/interface/update.tag.interface';
import { TagService } from 'libs/domains/tag/tag.service';

@Injectable()
export class TagControllerService {
  constructor(private tagService: TagService) {}
  create(user: ICreateTag) {
    return this.tagService.create(user);
  }
  getList() {
    return this.tagService.getList();
  }
  getById(id: number) {
    return this.tagService.getById(id);
  }
  update(id: number, tag: IUpdateTag) {
    return this.tagService.update(id, tag);
  }

  delete(id: number) {
    return this.tagService.delete(id);
  }
  getTagsTree(ratingId: number) {
    return this.tagService.getTagsTree(ratingId);
  }
}
