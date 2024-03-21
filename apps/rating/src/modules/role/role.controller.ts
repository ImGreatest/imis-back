import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { RoleControllerService } from './role.controller.service';
import { ReqCreateRoleDto } from './dto/create.role';
import { ReqUpdateRoleDto } from './dto/update.role';
import { UpdatePermissionDto } from './dto/update.permissions';

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
  @ApiBody({ type: ReqCreateRoleDto })
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
    @Query('limit', ParseIntPipe) limit: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    return this.roleService.getPage(limit, page);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.getById(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  @ApiBody({ type: ReqUpdateRoleDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: ReqUpdateRoleDto,
  ) {
    return this.roleService.update(id, role);
  }
  @checkAbilities({
    action: 'delete ',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Permission',
  })
  @UseGuards(AbilitiesGuard)
  @Put('/permission/:id')
  @ApiBody({ type: UpdatePermissionDto })
  async createDeletePermissions(
    @Param('id', ParseIntPipe) roleId: number,
    @Body() newPermission: UpdatePermissionDto[],
  ) {
    return this.roleService.createDeletePermissions(roleId, newPermission);
  }
}
