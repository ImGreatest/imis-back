import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserFavoriteProjectControllerService } from './user-favorite-project-controller.service';
import { ReqSubscribeOnProjectDto } from './dto/req-dto/req-subscribe-on-project.dto';
import { ReqUnsubscribeOnProjectDto } from './dto/req-dto/req-unsubscribe-on-project.dto';
import { ResGetSubsDto } from './dto/res-dto/res-get-subs.dto';

@ApiTags('user-favorite-project')
@ApiBearerAuth()
@Controller('user-favorite-project')
export class UserFavoriteProjectController {
  constructor(
    private userFavorPrjService: UserFavoriteProjectControllerService,
  ) {}

  @Post('subscribe-on-project')
  @ApiBody({ type: ReqSubscribeOnProjectDto })
  subProject(@Body() data: ReqSubscribeOnProjectDto): Promise<void> {
    return this.userFavorPrjService.subProject(data);
  }

  @Get('get-subs-by-user/:id')
  getSubsByUser(@Param('id') userId: number): Promise<ResGetSubsDto[]> {
    return this.userFavorPrjService.getSubsByUser(userId);
  }

  @Get('get-subs-by-project')
  getSubsByProject(
    @Param('projectId') projectId: number,
  ): Promise<ResGetSubsDto[]> {
    return this.userFavorPrjService.getSubsByProject(projectId);
  }

  @Delete('unsubscribe-on-project')
  @ApiBody({ type: ReqUnsubscribeOnProjectDto })
  unsubProject(@Body('data') data: ReqUnsubscribeOnProjectDto): Promise<void> {
    return this.userFavorPrjService.unsubProject(data);
  }
}
