import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../domains/project/repositories/project.repository';

@Injectable()
export class ProjectMockAdapter extends ProjectRepository {
  constructor() {
    super();
  }
}
