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
import { SuccessControllerService } from './success.controller.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { ReqCreateSuccessDto } from './dto/req.create.success.dto';
import { ReqUpdateSuccessDto } from './dto/req.update.success.dto';

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
  async create(@Body() success: ReqCreateSuccessDto) {
    return this.successService.create(success);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/page-:page')
  async getPage(@Query('limit') limit: number, @Param('page') page: number) {
    return this.successService.getPage(limit, page);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.successService.getById(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  async update(@Param('id') id: number, success: ReqUpdateSuccessDto) {
    return this.successService.update(id, success);
  }
  @checkAbilities({
    action: 'delete',
    subject: 'Success',
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
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
    @Param('id') successId: number,
    @Body() tagsIds: number[],
  ) {
    return this.successService.deleteAddTags(successId, tagsIds);
  }
}
