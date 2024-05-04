import { User } from 'libs/domains/user/entities/user.entity';

export interface IResGetUserAndCountDto {
  rows: User[];
  count: number;
}
