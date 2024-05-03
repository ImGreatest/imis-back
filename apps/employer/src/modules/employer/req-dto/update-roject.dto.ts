import { IsNotEmpty, IsArray } from 'class-validator';

export class UpdateProjectDto {
  
  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  employerId: string;

  @IsArray()
  developers: string[];

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  techStack: string;

  @IsNotEmpty()
  stage: string;

  @IsNotEmpty()
  status: string;
}