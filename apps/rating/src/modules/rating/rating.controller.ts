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
import { RatingControllerService } from './rating.controller.service';
import { ReqCreateRatingDto } from './dto/create.rating';
import { ReqUpdateRatingDto } from './dto/update.rating';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { checkAbilites } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';

@Controller('rating')
@ApiBearerAuth()
@ApiTags('rating')
export class RatingController {
  constructor(private ratingService: RatingControllerService) {}

  @checkAbilites({
    action: 'create',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Post()
  @ApiBody({ type: ReqCreateRatingDto })
  async createRating(user: ReqCreateRatingDto) {
    return this.ratingService.createRating(user);
  }

  @checkAbilites({
    action: 'read',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/page-:page')
  async getPage(@Query('limit') limit: number, @Param('page') page: number) {
    return this.ratingService.getPage(limit, page);
  }

  @checkAbilites({
    action: 'read',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.ratingService.getById(id);
  }

  @checkAbilites({
    action: 'update',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Put()
  @ApiBody({ type: ReqUpdateRatingDto })
  async updateRatingName(id: number, rating: ReqUpdateRatingDto) {
    return this.ratingService.updateRatingName(id, rating);
  }
  @checkAbilites({
    action: 'delete ',
    subject: 'Rating',
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async deleteRating(@Param('id') id: number) {
    return this.ratingService.deleteRating(id);
  }
}
