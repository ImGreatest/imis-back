import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { RoleControllerService } from './role.controller.service';
import { ReqCreateRoleDto } from './dto/req.create.role.dto';
import { ReqUpdateRoleDto } from './dto/req.update.role.dto';
import { UpdatePermissionDto } from './dto/req.update.permissions.dto';

@Controller('role')
@ApiBearerAuth()
@ApiTags('role')
export class RoleController {
  constructor(private roleService: RoleControllerService) {}

  @checkAbilities({
    action: 'create',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Post()
  async create(@Body() role: ReqCreateRoleDto) {
    return this.roleService.create(role);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/page-:page')
  async getPage(
    @Query('limit') limit: number,
    @Param('page') page: number,
    @Query('direction') direction: number,
    @Query('name') name: string,
  ) {
    return this.roleService.getPage(limit, page, direction, name);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/role-assert')
  getRolesAssert() {
    return this.roleService.getRolesAssert();
  }
  @checkAbilities({
    action: 'read',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.roleService.getById(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() role: ReqUpdateRoleDto) {
    return this.roleService.update(id, role);
  }
  @checkAbilities({
    action: 'delete ',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.roleService.delete(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Permission',
  })
  @UseGuards(AbilitiesGuard)
  @Put('/permission/:role')
  async createDeletePermissions(
    @Param('role') role: string,
    @Body() newPermission: UpdatePermissionDto[],
  ) {
    return this.roleService.createDeletePermissions(role, newPermission);
  }
}
