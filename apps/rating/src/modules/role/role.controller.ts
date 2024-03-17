import {
  Controller,
  Delete,
  Get,
  Param,
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
  async create(role: ReqCreateRoleDto) {
    return this.roleService.create(role);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Role',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/page-:page')
  async getPage(@Query('limit') limit: number, @Param('page') page: number) {
    return this.roleService.getPage(limit, page);
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
    subject: 'Tag',
  })
  @UseGuards(AbilitiesGuard)
  @Put()
  @ApiBody({ type: ReqUpdateRoleDto })
  async update(id: number, role: ReqUpdateRoleDto) {
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
}
