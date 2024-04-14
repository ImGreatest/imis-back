import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ICreateRating } from 'libs/domains/rating/interface/create.rating.interface';
import { IFilter } from 'libs/domains/rating/interface/filter.rating.interface';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating.interface';
import { IUpdateRating } from 'libs/domains/rating/interface/update.rating.interface';
import { RatingService } from 'libs/domains/rating/rating.service';

@Injectable()
export class RatingControllerService implements OnApplicationBootstrap {
  constructor(private ratingService: RatingService) {}
  async onApplicationBootstrap() {
    await this.ratingService.setIntervalsRating();
  }
  async createRating(createrId: number, user: ICreateRating) {
    return this.ratingService.createRating(createrId, user);
  }

  async getPage(limit: number, page: number) {
    return this.ratingService.getPage(limit, page);
  }
  async getById(id: number) {
    return this.ratingService.getById(id);
  }
  async updateRatingName(id: number, rating: IUpdateRating) {
    return this.ratingService.updateRatingName(id, rating);
  }

  async deleteRating(id: number) {
    return this.ratingService.deleteRating(id);
  }
  async deleteAndCreateRatingsScope(
    ratingId: number,
    newScope: IScopeRating[],
  ) {
    return this.ratingService.deleteAndCreateRatingsScope(ratingId, newScope);
  }
  async getRatingScore(
    id: number,
    page: number,
    limit: number,
    filters: IFilter[],
    column: string = 'ratingScore',
    sortDirection: 'asc' | 'desc' = 'desc',
  ) {
    return this.ratingService.getRatingScore(
      id,
      filters,
      page,
      limit,
      column,
      sortDirection,
    );
  }
  async updateRatingScore(id: number) {
    return this.ratingService.updateRatingScore(id);
  }
}
