import { User } from '../../../../entity/user';

export interface IResGetUserAndCountDto {
  rows: User[];
  count: number;
}
