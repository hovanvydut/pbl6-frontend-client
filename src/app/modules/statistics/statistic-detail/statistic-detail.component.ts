import { finalize } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotifyService } from '@app/shared/services/notify.service';
import { StatisticKey } from '../enums/statistic.enum';
import {
  StatisticDetailParamsModel,
  StatisticParamsModel
} from '../models/statistic.model';
import { StatisticService } from '../services/statistic.service';
import { STATISTIC_TABS } from '@app/shared/app.constants';

@Component({
  selector: 'app-statistic-detail',
  templateUrl: './statistic-detail.component.html',
  styleUrls: ['./statistic-detail.component.scss']
})
export class StatisticDetailComponent implements OnInit {
  tabs = STATISTIC_TABS;
  statisticParams: StatisticDetailParamsModel = new StatisticDetailParamsModel({
    key: StatisticKey.ViewPostDetail,
    date: new Date().toISOString(),
    includeDeleted: false,
    pageNumber: 1,
    pageSize: 10,
    searchValue: '',
    top: 5
  });
  selectedTab = this.tabs[0];
  statisticDetailData: any;
  totalRecords: number;
  displayedColumns: string[] = ['title', 'value'];
  value: number[];
  label: string[];
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { statisticData: any; statisticParams: StatisticParamsModel },
    public dialog: MatDialog,
    private statisticService: StatisticService
  ) {
    if (this.data) {
      this.statisticParams.key = data.statisticParams.key;
      this.statisticParams.date = data.statisticData.date;
      this.statisticParams.includeDeleted = data.statisticParams.includeDeleted;
      this.statisticParams.date = this.convertToDate(
        this.data.statisticData.statisticDate
      ).toISOString();
      this.getStatisticDetail();
      this.getStatisticTop();
    }
  }

  ngOnInit(): void {}

  getStatisticDetail() {
    this.isLoading = true;
    this.statisticService
      .getStatisticDetail(this.statisticParams)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(res => {
        this.statisticDetailData = res.records;
        this.totalRecords = res.totalRecords;
      });
  }

  getStatisticTop() {
    this.isLoading = true;

    this.statisticService
      .getStatisticTop(this.statisticParams)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(res => {
        this.value = res.map(item => {
          return parseInt(item.statisticValue);
        });
        this.label = res.map(item => {
          return item.title;
        });
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

  
  onTabClick(tab: any) {
    this.selectedTab = tab;
    switch (this.selectedTab.id) {
      case 'chart':
        this.getStatisticDetail();
        break;
      case 'table':
        this.getStatisticTop();
        break;
    }
  }
}
