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
import { TagControllerService } from './tag.controller.service';
import { ReqCreateTagDto } from './dto/req.create.tag.dto';
import { ReqUpdateTagDto } from './dto/req.update.tag.dto';

@Controller('tag')
@ApiBearerAuth()
@ApiTags('tag')
export class TagController {
  constructor(private tagService: TagControllerService) {}

  @checkAbilities({
    action: 'create',
    subject: 'Tag',
  })
  @UseGuards(AbilitiesGuard)
  @Post()
  async create(@Body() tag: ReqCreateTagDto) {
    return this.tagService.create(tag);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Tag',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/page-:page')
  async getPage(@Query('limit') limit: number, @Param('page') page: number) {
    return this.tagService.getPage(limit, page);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Tag',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.tagService.getById(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Tag',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() tag: ReqUpdateTagDto) {
    return this.tagService.update(id, tag);
  }
  @checkAbilities({
    action: 'delete ',
    subject: 'Tag',
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.tagService.delete(id);
  }
}
