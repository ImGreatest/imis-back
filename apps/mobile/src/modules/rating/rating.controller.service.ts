import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ICreateRating } from 'libs/domains/rating/interface/create.rating.interface';
import { IFilter } from 'libs/shared/interface/filter.interface';
import { IOrder } from 'libs/shared/interface/order.interface';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating.interface';
import { IUpdateRating } from 'libs/domains/rating/interface/update.rating.interface';
import { RatingService } from 'libs/domains/rating/rating.service';

@Injectable()
export class RatingControllerService implements OnApplicationBootstrap {
  constructor(private ratingService: RatingService) {}
  async onApplicationBootstrap() {
    await this.ratingService.setIntervalsRating();
  }
  

  
  getDefaultRatingScore(
    page: number,
    limit: number,
    filters: IFilter[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orderProps: IOrder,
    all: boolean = false,
  ) {
    return this.ratingService.getDefaultRatingScore(
      filters,
      page,
      limit,
      orderProps,
      all,
    );
  }
  
}
