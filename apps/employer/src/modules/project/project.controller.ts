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
    Patch,
    Req
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { Repository } from 'typeorm';
  import { checkAbilities } from 'libs/decorators/abilities.decorator';
  import { JwtService } from '@nestjs/jwt';
  import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
  
  @Controller('employer')
  @ApiBearerAuth()
  @ApiTags('employer')
  export class ProjectController{


  }