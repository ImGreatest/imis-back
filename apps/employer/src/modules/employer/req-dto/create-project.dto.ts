import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateProjectDto {
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