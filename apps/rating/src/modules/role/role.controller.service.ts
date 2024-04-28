import { Injectable } from '@nestjs/common';
import { ICreateRole } from 'libs/domains/role/interface/create.role.interface';
import { IUpdatePermission } from 'libs/domains/role/interface/update.permissions.interface';
import { IUpdateRole } from 'libs/domains/role/interface/update.role.interface';
import { RoleService } from 'libs/domains/role/role.service';

@Injectable()
export class RoleControllerService {
  constructor(private roleService: RoleService) {}
  create(role: ICreateRole) {
    return this.roleService.create(role);
  }
  getPage(limit: number, page: number, direction: number, name: string) {
    return this.roleService.getPage(limit, page, direction, name);
  }
  getById(id: number) {
    return this.roleService.getById(id);
  }
  update(id: number, role: IUpdateRole) {
    return this.roleService.update(id, role);
  }

  delete(id: number) {
    return this.roleService.delete(id);
  }
  createDeletePermissions(roleId: number, newPermission: IUpdatePermission[]) {
    return this.roleService.createDeletePermissions(roleId, newPermission);
  }
  getRolesAssert() {
    return this.roleService.getRolesAssert();
  }
}
