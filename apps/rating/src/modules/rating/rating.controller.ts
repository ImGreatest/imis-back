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
  Req,
  UseGuards,
} from '@nestjs/common';
import { RatingControllerService } from './rating.controller.service';
import { ReqCreateRatingDto } from './dto/create.rating';
import { ReqUpdateRatingDto } from './dto/update.rating';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { Public } from 'libs/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { ReqUpdateScopeDto } from './dto/update.scope';
import { ReqGetScoreDto } from './dto/get.score';
@Controller('rating')
@ApiBearerAuth()
@ApiTags('rating')
export class RatingController {
  constructor(
    private ratingService: RatingControllerService,
    private readonly jwtService: JwtService,
  ) {}

  @checkAbilities({
    action: 'create',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Post()
  @ApiBody({ type: ReqCreateRatingDto })
  async createRating(@Body() rating: ReqCreateRatingDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = this.jwtService.decode(token);
    const userId = payload['sub'];
    return this.ratingService.createRating(userId, rating);
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
    action: 'delete',
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
  @ApiBody({
    type: ReqUpdateScopeDto,
  })
  async createDeleteRatigsScope(
    @Param('id', ParseIntPipe) ratingId: number,
    @Body() newScope: ReqUpdateScopeDto,
  ) {
    return this.ratingService.createDeleteRatigsScope(ratingId, newScope.scope);
  }

  @Public()
  @Put(':id/score')
  @ApiBody({
    type: ReqGetScoreDto,
  })
  async getRatingScore(
    @Param('id', ParseIntPipe) ratingId: number,
    @Body() getData: ReqGetScoreDto,
  ) {
    console.log(getData);
    return this.ratingService.getRatingScore(
      ratingId,
      getData.page,
      getData.pageSize,
      getData.column,
      getData.sortDirection,
    );
  }
  @checkAbilities({
    action: 'update',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id/update')
  async updateRatingScore(@Param('id', ParseIntPipe) id: number) {
    return this.ratingService.updateRatingScore(id);
  }
}
