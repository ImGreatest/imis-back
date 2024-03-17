import { Injectable } from '@nestjs/common';
import { ICreateRating } from 'libs/domains/rating/interface/create.rating';
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
}
