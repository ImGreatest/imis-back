import { ApiProperty } from '@nestjs/swagger';

export class ProjectCreateDto {
  @ApiProperty({
    description: '1',
    type: Number
  })
  id: number;

  @ApiProperty({
    description: 'Проект 1',
    type: String
  })
  name: string;

  @ApiProperty({
    description: 'Это тестовый проект',
    type: String,
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Активный',
    type: String,
    required: false,
  })
  status?: string;

  @ApiProperty({
    description: '2024-01-01',
    type: () => Date,
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    description: '2024-01-02',
    type: () => Date,
    required: false,
  })
  updatedAt?: Date;

  @ApiProperty({
    description: 'null',
    type: () => Date,
    required: false,
  })
  deletedAt?: Date;
}