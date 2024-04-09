import { IScopeRating } from './scope.rating';

export interface ICreateRating {
  name: string;
  minuteUpdate: number;
  scope: IScopeRating[];
}
