import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotifyService } from '@app/shared/services/notify.service';
import { StatisticKey } from '../enums/statistic.enum';
import {
  StatisticDetailParamsModel,
  StatisticParamsModel
} from '../models/statistic.model';
import { StatisticService } from '../services/statistic.service';

@Component({
  selector: 'app-statistic-detail',
  templateUrl: './statistic-detail.component.html',
  styleUrls: ['./statistic-detail.component.scss']
})
export class StatisticDetailComponent implements OnInit {
  statisticParams: StatisticDetailParamsModel = new StatisticDetailParamsModel({
    key: StatisticKey.ViewPostDetail,
    date: new Date().toISOString(),
    includeDeleted: false,
    pageNumber: 1,
    pageSize: 10,
    searchValue: ''
  });
  statisticDetailData: any;
  totalRecords: number;
  displayedColumns: string[] = [
    'title',
    'value',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { statisticData: any; statisticParams: StatisticParamsModel },
    public dialog: MatDialog,
    private notifyService: NotifyService,
    private statisticService: StatisticService
  ) {
    this.statisticParams.key = data.statisticParams.key;
    this.statisticParams.date = data.statisticData.date;
    this.statisticParams.includeDeleted = data.statisticParams.includeDeleted;
    this.statisticParams.date = this.convertToDate(
      this.data.statisticData.statisticDate
    ).toISOString();
    this.getStatisticDetail();

  }

  ngOnInit() {
  }

  getStatisticDetail() {
    this.statisticService
      .getStatisticDetail(this.statisticParams)
      .subscribe(res => {
        console.log(res);
        this.statisticDetailData = res.records;
        this.totalRecords = res.totalRecords;
      });
  }

  convertToDate(dateString) {
    let d = dateString.split('/');
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
  }

  pageChangeEvent(event: { pageIndex: number; pageSize: number }) {
    this.statisticParams.pageSize = event.pageSize;
    this.statisticParams.pageNumber = event.pageIndex + 1;
    this.getStatisticDetail();
  }
}
