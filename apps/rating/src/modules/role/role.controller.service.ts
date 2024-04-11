import { Injectable } from '@nestjs/common';
import { ICreateRole } from 'libs/domains/role/interface/create.role.interface';
import { IUpdatePermission } from 'libs/domains/role/interface/update.permissions.interface';
import { IUpdateRole } from 'libs/domains/role/interface/update.role.interface';
import { RoleService } from 'libs/domains/role/role.service';

@Injectable()
export class RoleControllerService {
  constructor(private roleService: RoleService) {}
  async create(role: ICreateRole) {
    return this.roleService.create(role);
  }
  async getPage(limit: number, page: number) {
    return this.roleService.getPage(limit, page);
  }
  async getById(id: number) {
    return this.roleService.getById(id);
  }
  async update(id: number, role: IUpdateRole) {
    return this.roleService.update(id, role);
  }

  async delete(id: number) {
    return this.roleService.delete(id);
  }
  async createDeletePermissions(
    roleId: number,
    newPermission: IUpdatePermission[],
  ) {
    return this.roleService.createDeletePermissions(roleId, newPermission);
  }
}
