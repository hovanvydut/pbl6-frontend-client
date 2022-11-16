import { StatisticKey } from "../enums/statistic.enum";

export class StatisticParamsModel {
  key: StatisticKey;
  postIds?: string[];
  fromDate?: string;
  toDate?: string;
  IncludeDeleted: boolean;

  public constructor(init?: Partial<StatisticParamsModel>) {
    Object.assign(this, init);
  }
}
