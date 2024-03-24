import { IScopeRating } from './scope.rating';

export interface ICreateRating {
  name: string;
  hourlyUpdate: number;
  scope: IScopeRating[];
}
