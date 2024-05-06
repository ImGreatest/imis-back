import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateRating } from './interface/create.rating.interface';
import { IUpdateRating } from './interface/update.rating.interface';
import { IScopeRating } from './interface/scope.rating.interface';
import { CronService } from 'libs/services/cron/cron.service';
import { IFilter } from 'libs/shared/interface/filter.interface';
import { IOrder } from 'libs/shared/interface/order.interface';

@Injectable()
export class RatingService {
  constructor(
    private prisma: PrismaService,
    private cronService: CronService,
  ) {}

  /**
   * Creates a new rating for a creator.
   *
   * @param {number} createrId - The ID of the creator.
   * @param {ICreateRating} rating - The rating to be created.
   * @return {Promise<Rating>} The created rating.
   */
  async createRating(createrId: number, rating: ICreateRating) {
    const scope = rating.scope;
    delete rating.scope;
    if (rating.default) {
      await this.prisma.rating.updateMany({
        where: { default: true },
        data: { default: false },
      });
    }
    const createdRating = await this.prisma.rating.create({
      data: { ...rating, createrId: createrId },
    });

    if (!createdRating) {
      throw new ConflictException('Рейтинг не создан');
    }

    await this.deleteAndCreateRatingsScope(createdRating.id, scope);
    if (rating.minuteUpdate) {
      this.cronService.addInterval(
        `rating-${createdRating.id}`,
        1000 * 60 * rating.minuteUpdate,
        () => this.updateRatingScore(createdRating.id),
      );
    }
    return createdRating;
  }
  /**
   * Retrieves a page of ratings based on the provided filters and pagination parameters.
   *
   * @param {number} limit - The maximum number of ratings to retrieve per page.
   * @param {number} page - The page number of the ratings to retrieve.
   * @param {IFilter[]} [filters=[]] - Optional array of filters to apply to the ratings.
   * @param {IOrder} orderProps - The properties to order the ratings by.
   * @return {Promise<{info: {page: number, pageSize: number, totalCount: number, totalPages: number}, rows: Rating[]}>}
   * A promise that resolves to an object containing information about the retrieved page and the ratings themselves.
   */
  async getPage(
    limit: number,
    page: number,
    filters: IFilter[] = [],
    orderProps: IOrder,
  ) {
    let whereOptions = {};
    filters.forEach((filter) => {
      whereOptions = { ...whereOptions, [filter.column]: filter.value };
    });
    const offset = (page - 1) * limit;
    const pageCount = await this.prisma.rating.count({ where: whereOptions });
    const ratings = await this.prisma.rating.findMany({
      where: whereOptions,
      orderBy: orderProps,
      take: limit,
      skip: offset,
      include: {
        creater: {
          select: {
            name: true,
            surname: true,
          },
        },
      },
    });
    return {
      info: {
        page: page,
        pageSize: limit,
        totalCount: pageCount,
        totalPages: Math.ceil(pageCount / limit),
      },
      rows: ratings,
    };
  }
  /**
   * Retrieves a rating by its ID.
   *
   * @param {number} id - The ID of the rating to retrieve.
   * @return {Promise<Rating | null>} A promise that resolves to the rating with the specified ID, or null if not found.
   */
  async getById(id: number) {
    return this.prisma.rating.findUnique({
      where: { id: id },
    });
  }
  /**
   * Updates the rating information based on the provided ID and rating data.
   *
   * @param {number} id - The ID of the rating to update.
   * @param {IUpdateRating} rating - The updated rating data.
   * @return {Promise<Rating>} A promise that resolves to the updated rating.
   */
  async updateRating(id: number, rating: IUpdateRating) {
    const dbRating = await this.prisma.rating.findUnique({
      where: { id: id },
    });
    if (!dbRating) {
      throw new NotFoundException(`Рейтинг не найден`);
    }
    if (rating.default) {
      await this.prisma.rating.updateMany({
        where: { default: true },
        data: { default: false },
      });
    }
    const scope = rating.scope;
    delete rating.scope;
    if (scope) {
      await this.deleteAndCreateRatingsScope(id, scope);
    }
    this.cronService.deleteInterval(`rating-${id}`);
    if (rating.minuteUpdate && rating.minuteUpdate !== dbRating.minuteUpdate) {
      this.cronService.addInterval(
        `rating-${id}`,
        1000 * 60 * rating.minuteUpdate,
        () => this.updateRatingScore(id),
      );
    }
    return this.prisma.rating.update({
      where: { id: id },
      data: rating,
    });
  }

  /**
   * Deletes a rating by its ID.
   *
   * @param {number} id - The ID of the rating to be deleted.
   * @return {Promise<void>} - A promise that resolves when the rating is successfully deleted.
   * @throws {NotFoundException} - If the rating with the specified ID is not found.
   */
  async deleteRating(id: number) {
    try {
      this.cronService.deleteInterval(`rating-${id}`);
    } catch {}
    const raiting = await this.prisma.rating.findUnique({
      where: { id: id },
    });
    if (!raiting) {
      throw new NotFoundException(`Рейтинг не найден`);
    }

    return this.prisma.rating.delete({
      where: { id: id },
    });
  }
  /**
   * Deletes and creates multiple rating scopes based on the provided rating ID and new scope data.
   *
   * @param {number} ratingId - The ID of the rating.
   * @param {IScopeRating[]} newScope - An array of new scope ratings to be created.
   */
  async deleteAndCreateRatingsScope(
    ratingId: number,
    newScope: IScopeRating[],
  ) {
    await this.prisma.ratingScope.deleteMany({
      where: {
        ratingId: ratingId,
      },
    });
    await this.prisma.ratingScope.createMany({
      data: newScope.map((scope) => ({ ...scope, ratingId: ratingId })),
    });
  }
  /**
   * Calculates the median value of an array of numbers.
   *
   * @param {number[]} array - The input array of numbers.
   * @return {number} The median value of the input array.
   */
  getMediana(array: number[]) {
    const sortedArray = array.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedArray.length / 2);

    if (sortedArray.length % 2 !== 0) {
      return sortedArray[middleIndex];
    } else {
      const middleValuesSum =
        sortedArray[middleIndex - 1] + sortedArray[middleIndex];
      return middleValuesSum / 2;
    }
  }
  /**
   * Retrieves the default rating score along with detailed information about the scores.
   *
   * @param {IFilter[]} [filters=[]] - Optional array of filters to apply to the ratings.
   * @param {number} page - The page number of the ratings to retrieve.
   * @param {number} limit - The maximum number of ratings to retrieve per page.
   * @param {IOrder} orderProps - The properties to order the ratings by.
   * @param {boolean} [all=false] - Flag indicating whether to retrieve all scores or not.
   * @return {Promise<{info: {page: number, pageSize: number, totalCount: number, totalPages: number, minScores: number, maxScores: number}, rows: Score[]}>}
   * A promise that resolves to an object containing detailed information about the default rating score and the scores themselves.
   */
  async getDefaultRatingScore(
    filters: IFilter[] = [],
    page: number,
    limit: number,
    orderProps: IOrder,
    all: boolean = false,
  ) {
    const rating = await this.prisma.rating.findFirst({
      where: { default: true },
    });
    if (!rating) {
      throw new NotFoundException(`Рейтинг по умолчанию не найден`);
    }
    let whereOptions = { ratingId: rating.id };
    filters.forEach((filter) => {
      whereOptions = { ...whereOptions, [filter.column]: filter.value };
    });
    const scoresCount = await this.prisma.score.count({
      where: whereOptions,
    });
    let takeProps = {};
    if (!all) {
      takeProps = { take: limit, skip: (page - 1) * limit };
    }
    const scores = await this.prisma.score.findMany({
      where: whereOptions,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            surname: true,
            course: true,
            group: true,
            direction: true,
          },
        },
      },
      ...takeProps,
      orderBy: orderProps,
    });
    const minMaxScores = await this.prisma.score.aggregate({
      _min: { ratingScore: true },
      _max: { ratingScore: true },
    });
    return {
      info: {
        page: page,
        pageSize: limit,
        totalCount: scoresCount,
        totalPages: all ? 1 : Math.ceil(scoresCount / limit),
        minScores: minMaxScores._min.ratingScore,
        maxScores: minMaxScores._max.ratingScore,
      },
      rows: scores,
    };
  }
  /**
   * Retrieves the rating score based on the provided ID, filters, pagination parameters, and order properties.
   *
   * @param {number} id - The ID of the rating.
   * @param {IFilter[]} [filters=[]] - Optional array of filters to apply to the scores.
   * @param {number} page - The page number of the scores to retrieve.
   * @param {number} limit - The maximum number of scores to retrieve per page.
   * @param {IOrder} orderProps - The properties to order the scores by.
   * @param {boolean} [all=false] - Flag indicating whether to retrieve all scores or not.
   * @return {Promise<{info: {page: number, pageSize: number, totalCount: number, totalPages: number, minScores: number, maxScores: number}, rows: Score[]}>}
   * A promise that resolves to an object containing detailed information about the rating score and the scores themselves.
   */
  async getRatingScore(
    id: number,
    filters: IFilter[] = [],
    page: number,
    limit: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orderProps: IOrder,
    all: boolean = false,
  ) {
    let whereOptions = { ratingId: id };
    filters.forEach((filter) => {
      whereOptions = { ...whereOptions, [filter.column]: filter.value };
    });
    const scoresCount = await this.prisma.score.count({
      where: whereOptions,
    });
    let takeProps = {};
    if (!all) {
      takeProps = { take: limit, skip: (page - 1) * limit };
    }
    const scores = await this.prisma.score.findMany({
      where: whereOptions,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            surname: true,
            course: true,
            group: true,
            direction: true,
          },
        },
      },
      ...takeProps,
      orderBy: orderProps,
    });
    whereOptions = { ratingId: id };
    const minMaxScores = await this.prisma.score.aggregate({
      _min: { ratingScore: true },
      _max: { ratingScore: true },
    });
    return {
      info: {
        page: page,
        pageSize: limit,
        totalCount: scoresCount,
        totalPages: all ? 1 : Math.ceil(scoresCount / limit),
        minScores: minMaxScores._min.ratingScore,
        maxScores: minMaxScores._max.ratingScore,
      },
      rows: scores,
    };
  }
  /**
   * Sets up intervals for updating ratings.
   *
   * @return {Promise<void>} A promise that resolves when the intervals are set up.
   */
  async setIntervalsRating() {
    const ratings = await this.prisma.rating.findMany({
      where: { minuteUpdate: { gt: 0 } },
    });
    ratings.forEach((rating) => {
      if (rating.minuteUpdate) {
        this.cronService.addInterval(
          `rating-${rating.id}`,
          1000 * 60 * rating.minuteUpdate,
          () => this.updateRatingScore(rating.id),
        );
      }
    });
  }
  /**
   * Updates the score of a rating.
   *
   * @param {number} id - The ID of the rating.
   * @return {Promise<void>} A promise that resolves when the score is updated.
   */
  async updateRatingScore(id: number) {
    const rating = await this.prisma.rating.findUnique({
      where: { id: id },
      select: {
        scoringType: true,
      },
    });
    if (!rating) {
      throw new NotFoundException(`Рейтинг не найден`);
    }
    await this.prisma.score.deleteMany({
      where: { ratingId: id },
    });
    const students = await this.prisma.user.findMany({
      where: { role: { name: 'student' } },
    });
    const success = await this.prisma.success.findMany({
      where: { studentId: { in: students.map((student) => student.id) } },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    const allTags = await this.prisma.tag.findMany({
      where: { deletedAt: null },
      include: {
        childTags: true,
        ratingScope: {
          where: {
            ratingId: id,
          },
        },
      },
    });
    const rootTags = allTags.filter((tag) => tag.childTags.length === 0);

    const recurseModify = (tag, sum): number => {
      const child = allTags.find((child) => child.id === tag.baseTagId);
      sum *= child.ratingScope ? child.ratingScope[0].ratingScore : 1;
      if (child.baseTagId) {
        return recurseModify(child, sum);
      }
      return sum;
    };

    const ratingScope: { [key: number]: number } = {};

    rootTags.forEach((tag) => {
      const ratingScore =
        tag.ratingScope.length > 0 ? tag.ratingScope[0].ratingScore : 0;
      ratingScope[tag.id] = tag.baseTagId
        ? recurseModify(tag, ratingScore)
        : ratingScore;
    });

    const scorePromises = students.map(async (student) => {
      const studentSuccess = success.filter(
        (success) => success.studentId === student.id,
      );
      const sum = await Promise.all(
        studentSuccess.map(async (success) => {
          const tagRatings = await Promise.all(
            success.tags.map(async (tag) => {
              const score = ratingScope[tag.tagId] || 0;
              return score;
            }),
          );
          if (rating.scoringType === 'mediana') {
            return this.getMediana(tagRatings);
          }
          const scoringFunctions = {
            sum: (acc, cur) => acc + cur,
            maximum: (acc, cur) => Math.max(acc, cur),
            average: (acc, cur) => acc + cur,
          };
          const successSum = tagRatings.reduce((acc, cur) => {
            const scoringFunction = scoringFunctions[rating.scoringType];
            if (scoringFunction) {
              return scoringFunction(acc, cur);
            } else {
              return acc;
            }
          }, 0);

          return rating.scoringType === 'average'
            ? successSum / tagRatings.length
            : successSum;
        }),
      );

      const totalSum = sum.reduce((acc, cur) => acc + cur, 0);
      return this.prisma.score.create({
        data: {
          studentId: student.id,
          ratingId: id,
          ratingScore: totalSum,
        },
      });
    });

    await Promise.all(scorePromises);
  }
}
