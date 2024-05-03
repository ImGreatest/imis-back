import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { TagControllerService } from './tag.controller.service';
import { ReqCreateTagDto } from './dto/req.create.tag.dto';
import { ReqUpdateTagDto } from './dto/req.update.tag.dto';
import { Public } from 'libs/decorators/public.decorator';

@Controller('tag')
@ApiBearerAuth()
@ApiTags('tag')
export class TagController {
  constructor(private tagService: TagControllerService) {}

  // @checkAbilities({
  //   action: 'read',
  //   subject: 'Tag',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Get('tree/:ratingId')
  getTagsTree(@Param('ratingId') ratingId: number) {
    return this.tagService.getTagsTree(ratingId);
  }

  // @checkAbilities({
  //   action: 'create',
  //   subject: 'Tag',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Post()
  create(@Body() tag: ReqCreateTagDto) {
    return this.tagService.create(tag);
  }

  // @checkAbilities({
  //   action: 'read',
  //   subject: 'Tag',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Get('/getList')
  getList() {
    return this.tagService.getList();
  }

  // @checkAbilities({
  //   action: 'read',
  //   subject: 'Tag',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Get('/getAll')
  getAll() {
    return this.tagService.getAll();
  }

  @checkAbilities({
    action: 'read',
    subject: 'Tag',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.tagService.getById(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Tag',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() tag: ReqUpdateTagDto) {
    return this.tagService.update(id, tag);
  }
  // @checkAbilities({
  //   action: 'delete',
  //   subject: 'Tag',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tagService.delete(id);
  }
}
