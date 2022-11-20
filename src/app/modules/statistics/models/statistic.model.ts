import { StatisticKey } from "../enums/statistic.enum";

export class StatisticParamsModel  {
  key: StatisticKey;
  postIds?: string[];
  fromDate?: string;
  toDate?: string;
  includeDeleted: boolean;

 

  public constructor(init?: Partial<StatisticParamsModel>) {
    Object.assign(this, init);
  }
}

export class StatisticDetailParamsModel {
  key: StatisticKey;
  date: string;
  includeDeleted: boolean;
  top?: number;

  pageNumber: number;
  pageSize: number;
  searchValue: string;


  public constructor(init?: Partial<StatisticDetailParamsModel>) {
    Object.assign(this, init);
  }
}
