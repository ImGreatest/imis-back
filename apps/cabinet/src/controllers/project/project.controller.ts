import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('project')
@ApiBearerAuth()
@Controller('project')
export class ProjectController {}
