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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { Public } from 'libs/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { ReqGetPageDto } from '../../../../../libs/shared/interface/req.get.page.dto';
@Controller('rating')
@ApiBearerAuth()
@ApiTags('rating')
export class RatingController {
  constructor(
    private ratingService: RatingControllerService,
    private readonly jwtService: JwtService,
  ) {}

  
  

  // @checkAbilities({
  //   action: 'update',
  //   subject: 'Rating',
  // })
  // @UseGuards(AbilitiesGuard)
  

  

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

  
}
