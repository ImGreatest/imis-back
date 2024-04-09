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
import { PermissionControllerService } from './permission.controller.service';
import { ReqCreatePermissionDto } from './dto/create.permission';
import { ReqUpdatePermissionDto } from './dto/update.permission';

@Controller('permission')
@ApiBearerAuth()
@ApiTags('permission')
export class PermissionController {
  constructor(private permissionService: PermissionControllerService) {}

  @checkAbilities({
    action: 'create',
    subject: 'Permission',
  })
  @UseGuards(AbilitiesGuard)
  @Post()
  @ApiBody({ type: ReqCreatePermissionDto })
  async create(@Body() permission: ReqCreatePermissionDto) {
    return this.permissionService.create(permission);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Permission',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/page-:page')
  async getPage(
    @Query('limit', ParseIntPipe) limit: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    return this.permissionService.getPage(limit, page);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Permission',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.getById(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Permission',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  @ApiBody({ type: ReqUpdatePermissionDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() permission: ReqUpdatePermissionDto,
  ) {
    return this.permissionService.update(id, permission);
  }
  @checkAbilities({
    action: 'delete ',
    subject: 'Permission',
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.delete(id);
  }
}
