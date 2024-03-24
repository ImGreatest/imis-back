import { IScopeRating } from './scope.rating';

export interface IUpdateRating {
  name?: string;
  hourlyUpdate?: number;
  scope?: IScopeRating[];
}
