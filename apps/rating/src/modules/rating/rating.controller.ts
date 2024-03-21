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
import { RatingControllerService } from './rating.controller.service';
import { ReqCreateRatingDto } from './dto/create.rating';
import { ReqUpdateRatingDto } from './dto/update.rating';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating';
import { Public } from 'libs/decorators/public.decorator';

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
  @ApiBody({ type: ReqCreateRatingDto })
  async createRating(@Body() rating: ReqCreateRatingDto) {
    return this.ratingService.createRating(rating);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/page-:page')
  async getPage(
    @Query('limit', ParseIntPipe) limit: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    return this.ratingService.getPage(limit, page);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.ratingService.getById(id);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  @ApiBody({ type: ReqUpdateRatingDto })
  async updateRatingName(
    @Param('id', ParseIntPipe) id: number,
    @Body() rating: ReqUpdateRatingDto,
  ) {
    return this.ratingService.updateRatingName(id, rating);
  }
  @checkAbilities({
    action: 'delete ',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async deleteRating(@Param('id', ParseIntPipe) id: number) {
    return this.ratingService.deleteRating(id);
  }
  @checkAbilities({
    action: 'update',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id/scope')
  @ApiBody({ type: Array<IScopeRating> })
  async createDeleteRatigsScope(
    @Param('id', ParseIntPipe) ratingId: number,
    @Body() newScope: IScopeRating[],
  ) {
    return this.ratingService.createDeleteRatigsScope(ratingId, newScope);
  }

  @Public()
  @Get(':id/score')
  async getRatingScore(@Param('id', ParseIntPipe) ratingId: number) {
    return this.ratingService.getRatingScore(ratingId);
  }
}
