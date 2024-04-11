import { IScopeRating } from './scope.rating.interface';

export interface IUpdateRating {
  name?: string;
  minuteUpdate?: number;
  scope?: IScopeRating[];
}
