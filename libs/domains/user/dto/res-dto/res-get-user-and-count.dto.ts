import { User } from '../../entities/user';

export interface IResGetUserAndCountDto {
  rows: User[];
  count: number;
}
