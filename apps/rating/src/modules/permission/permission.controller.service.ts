import { Injectable } from '@nestjs/common';
import { ICreatePermission } from 'libs/domains/permission/interface/create.permission';
import { IUpdatePermission } from 'libs/domains/permission/interface/update.permission';
import { PermissionService } from 'libs/domains/permission/permission.service';

@Injectable()
export class PermissionControllerService {
  constructor(private permissionService: PermissionService) {}
  async create(permission: ICreatePermission) {
    return this.permissionService.create(permission);
  }
  async getPage(limit: number, page: number) {
    return this.permissionService.getPage(limit, page);
  }
  async getById(id: number) {
    return this.permissionService.getById(id);
  }
  async update(id: number, permission: IUpdatePermission) {
    return this.permissionService.update(id, permission);
  }

  async delete(id: number) {
    return this.permissionService.delete(id);
  }
}
