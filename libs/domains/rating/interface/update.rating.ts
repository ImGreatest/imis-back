import { IScopeRating } from './scope.rating';

export interface IUpdateRating {
  name?: string;
  minuteUpdate?: number;
  scope?: IScopeRating[];
}
