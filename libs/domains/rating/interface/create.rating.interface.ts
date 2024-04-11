import { IScopeRating } from './scope.rating.interface';

export interface ICreateRating {
  name: string;
  minuteUpdate: number;
  scope: IScopeRating[];
}
