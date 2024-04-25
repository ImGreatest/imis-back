import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../domains/project/repositories/project.repository';

@Injectable()
export class ProjectAdapter extends ProjectRepository {}
