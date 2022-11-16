import { StatisticDetailComponent } from './../statistic-detail/statistic-detail.component';
import { ChartTypes } from './../consts/chart-type.const';
import { finalize } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StatisticTypes } from '../consts/statistic.const';
import { StatisticKey } from '../enums/statistic.enum';
import { StatisticParamsModel } from '../models/statistic.model';
import { StatisticService } from '../services/statistic.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PostService } from '@app/modules/post/services/post.service';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-statistic-revenue',
  templateUrl: './statistic-revenue.component.html',
  styleUrls: ['./statistic-revenue.component.scss']
})
export class StatisticRevenueComponent implements OnInit {
  StatisticTypes = StatisticTypes;
  ChartTypes = ChartTypes;
  statisticParams: StatisticParamsModel = new StatisticParamsModel({
    key: StatisticKey.ViewPostDetail,
    fromDate: new Date(
      new Date().setDate(new Date().getDate() - 10)
    ).toISOString(),
    toDate: new Date().toISOString(),
    includeDeleted: false
  });
  value: number[];
  label: string[];
  range = new FormGroup({
    start: new FormControl<Date | null>(
      new Date(new Date().setDate(new Date().getDate() - 10))
    ),
    end: new FormControl<Date | null>(new Date())
  });
  selectedType = StatisticTypes[0];
  statisticData: any;
  selectedChartType = ChartTypes[0].value;
  selectedChartName = ChartTypes[0].name;

  isLoading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { hasUpdate: boolean },
    public dialog: MatDialog,
    private notifyService: NotifyService,
    private statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.getStatistic();
  }

  getStatistic() {
    this.isLoading = true;
    this.statisticService
      .getStatistic(this.statisticParams)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(res => {
        this.statisticData = res;
        this.value = res.map(item => {
          return item.statisticValue;
        });
        this.label = res.map(item => {
          return item.statisticDate;
        });
      });
  }

  onDateRangeChanged() {
    this.statisticParams.fromDate = this.range.value.start.toISOString();
    this.statisticParams.toDate = this.range.value.end.toISOString();
    this.getStatistic();
  }

  onDateRangeReset() {
    this.range.reset();
    this.statisticParams.fromDate = null;
    this.statisticParams.toDate = null;
    this.getStatistic();
  }

  onTabChanged() {
    this.getStatistic();
    this.selectedType = StatisticTypes.find(
      item => item.key === this.statisticParams.key
    );
  }
  onChartTypeChanged() {
    this.getStatistic();
    this.selectedChartName = ChartTypes.find(
      item => item.value === this.selectedChartType
    ).name;
  }

  chartClick(dataPointIndex: number) {
    if (dataPointIndex !== -1) {
      let dialogRef = this.dialog.open(StatisticDetailComponent, {
        width: '90vw',
        height: '90vh',
        data: {
          statisticData: this.statisticData[dataPointIndex],
          statisticParams: this.statisticParams
        }
      });
    }
  }
}
