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
import { SuccessControllerService } from './success.controller.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { ReqCreateSuccessDto } from './dto/create.success';
import { ReqUpdateSuccessDto } from './dto/update.success';

@Controller('success')
@ApiBearerAuth()
@ApiTags('success')
export class SuccessController {
  constructor(private successService: SuccessControllerService) {}

  @checkAbilities({
    action: 'create',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Post()
  @ApiBody({ type: ReqCreateSuccessDto })
  async create(@Body() success: ReqCreateSuccessDto) {
    return this.successService.create(success);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/page-:page')
  async getPage(
    @Query('limit', ParseIntPipe) limit: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    return this.successService.getPage(limit, page);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.successService.getById(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  @ApiBody({ type: ReqUpdateSuccessDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    success: ReqUpdateSuccessDto,
  ) {
    return this.successService.update(id, success);
  }
  @checkAbilities({
    action: 'delete',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.successService.delete(id);
  }
  @checkAbilities({
    action: 'update',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Post('tags/:id')
  @ApiBody({ type: [Number] })
  async deleteAddTags(
    @Param('id', ParseIntPipe) successId: number,
    @Body() tagsIds: number[],
  ) {
    return this.successService.deleteAddTags(successId, tagsIds);
  }
}
