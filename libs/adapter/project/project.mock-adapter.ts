import { ProjectRepository } from '../../domains/project/repositories/project.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectMockAdapter extends ProjectRepository {}
