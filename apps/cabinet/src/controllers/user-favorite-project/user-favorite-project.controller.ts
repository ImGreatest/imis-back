import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserFavoriteProjectControllerService } from './user-favorite-project-controller.service';
import { SubscribeOnProjectDto } from './dto/req-dto/subscribe-on-project.dto';
import { UnsubscribeOnProjectDto } from './dto/req-dto/unsubscribe-on-project.dto';
import { GetSubsDto } from './dto/res-dto/get-subs.dto';

@ApiTags('user-favorite-project')
@ApiBearerAuth()
@Controller('user-favorite-project')
export class UserFavoriteProjectController {
  constructor(
    private userFavorPrjService: UserFavoriteProjectControllerService,
  ) {}

  @Post('subscribe-on-project')
  @ApiBody({ type: SubscribeOnProjectDto })
  subProject(@Body('data') data: SubscribeOnProjectDto): Promise<void> {
    return this.userFavorPrjService.subProject(data);
  }

  @Get('get-subs-by-user')
  getSubsByUser(@Param('userId') userId: number): Promise<GetSubsDto[]> {
    return this.userFavorPrjService.getSubsByUser(userId);
  }

  @Get('get-subs-by-project')
  getSubsByProject(
    @Param('projectId') projectId: number,
  ): Promise<GetSubsDto[]> {
    return this.userFavorPrjService.getSubsByProject(projectId);
  }

  @Delete('unsubscribe-on-project')
  @ApiBody({ type: UnsubscribeOnProjectDto })
  unsubProject(@Body('data') data: UnsubscribeOnProjectDto): Promise<void> {
    return this.userFavorPrjService.unsubProject(data);
  }
}
