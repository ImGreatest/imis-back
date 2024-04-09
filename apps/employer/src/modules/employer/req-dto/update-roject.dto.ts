import { IsNotEmpty, IsArray } from 'class-validator';

export class UpdateProjectDto {
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
}