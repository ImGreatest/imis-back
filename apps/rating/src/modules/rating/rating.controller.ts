import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { JwtService } from '@nestjs/jwt';
import { ReqUpdateScopeDto } from './dto/req.update.scope.dto';
import { ReqGetScoreDto } from './dto/req.get.score.dto';
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
  async getPage(@Query('limit') limit: number, @Param('page') page: number) {
    return this.ratingService.getPage(limit, page);
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

  @checkAbilities({
    action: 'update',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  async updateRatingName(
    @Param('id') id: number,
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
    return this.ratingService.createDeleteRatigsScope(ratingId, newScope.scope);
  }

  @Public()
  @Put(':id/score')
  async getRatingScore(
    @Param('id') ratingId: number,
    @Body() getData: ReqGetScoreDto,
  ) {
    return this.ratingService.getRatingScore(
      ratingId,
      getData.page,
      getData.pageSize,
      getData.filters,
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
  async updateRatingScore(@Param('id') id: number) {
    return this.ratingService.updateRatingScore(id);
  }
}
