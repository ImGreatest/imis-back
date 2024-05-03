import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RatingControllerService } from './rating.controller.service';
import { ReqCreateRatingDto } from './dto/req.create.rating.dto';
import { ReqUpdateRatingDto } from './dto/req.update.rating.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { Public } from 'libs/decorators/public.decorator';
import { ReqUpdateScopeDto } from './dto/req.update.scope.dto';
import { ReqGetPageDto } from '../../../../../libs/shared/interface/req.get.page.dto';
@Controller('rating')
@ApiBearerAuth()
@ApiTags('rating')
export class RatingController {
  constructor(private ratingService: RatingControllerService) {}

  @checkAbilities({
    action: 'create',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Post()
  async createRating(@Body() rating: ReqCreateRatingDto, @Req() req) {
    const userId = req.user.sub;
    return this.ratingService.createRating(userId, rating);
  }

  // @checkAbilities({
  //   action: 'read',
  //   subject: 'Rating',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Post('/table')
  async getPage(@Body() getData: ReqGetPageDto) {
    return this.ratingService.getPage(
      getData.pageSize,
      getData.page,
      getData.filters,
      getData.orderProps,
    );
  }

  @checkAbilities({
    action: 'read',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.ratingService.getById(id);
  }

  // @checkAbilities({
  //   action: 'update',
  //   subject: 'Rating',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Put(':id')
  async updateRating(
    @Param('id') id: number,
    @Body() rating: ReqUpdateRatingDto,
  ) {
    return this.ratingService.updateRating(id, rating);
  }
  @checkAbilities({
    action: 'delete',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async deleteRating(@Param('id') id: number) {
    return this.ratingService.deleteRating(id);
  }
  @checkAbilities({
    action: 'update',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id/scope')
  async createDeleteRatigsScope(
    @Param('id') ratingId: number,
    @Body() newScope: ReqUpdateScopeDto,
  ) {
    return this.ratingService.deleteAndCreateRatingsScope(
      ratingId,
      newScope.scope,
    );
  }

  @Public()
  @Put(':id/score') // http:localhost:3000/api/rating/1/score
  async getRatingScore(
    @Param('id') ratingId: number,
    @Body() getData: ReqGetPageDto,
  ) {
    return this.ratingService.getRatingScore(
      ratingId,
      getData.page,
      getData.pageSize,
      getData.filters,
      getData.orderProps,
      getData.all,
    );
  }

  @Public()
  @Put('getScore/default') // http:localhost:3000/api/rating/1/score
  async getDefaultRatingScore(@Body() getData: ReqGetPageDto) {
    return this.ratingService.getDefaultRatingScore(
      getData.page,
      getData.pageSize,
      getData.filters,
      getData.orderProps,
      getData.all,
    );
  }

  @checkAbilities({
    action: 'update',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id/update')
  async updateRatingScore(@Param('id') id: number) {
    return this.ratingService.updateRatingScore(id);
  }
}
