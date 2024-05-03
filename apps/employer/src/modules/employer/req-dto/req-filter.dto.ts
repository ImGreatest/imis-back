// src/employer/dto/filter.dto.ts
import { IsInt, IsOptional, Min, Max, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  stream?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  direction?: number;

  @IsOptional()
  @IsString()
  programmingLanguage?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxScore?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minScore?: number;
}