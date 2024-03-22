import { Injectable } from '@nestjs/common';
import { ICreateRating } from 'libs/domains/rating/interface/create.rating';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating';
import { IUpdateRating } from 'libs/domains/rating/interface/update.rating';
import { RatingService } from 'libs/domains/rating/rating.service';

@Injectable()
export class RatingControllerService {
  constructor(private ratingService: RatingService) {}
  async createRating(user: ICreateRating) {
    return this.ratingService.createRating(user);
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
  async createDeleteRatigsScope(ratingId: number, newScope: IScopeRating[]) {
    return this.ratingService.createDeleteRatigsScope(ratingId, newScope);
  }
  async getRatingScore(id: number) {
    return this.ratingService.getRatingScore(id);
  }
  async updateRatingScore(id: number) {
    return this.ratingService.updateRatingScore(id);
  }
}
