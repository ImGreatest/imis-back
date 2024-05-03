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
  
  @Controller('employer')
  @ApiBearerAuth()
  @ApiTags('employer')
  export class ProjectController{


  }