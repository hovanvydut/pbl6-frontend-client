import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { StatisticRevenueComponent } from './statistic-revenue/statistic-revenue.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { SharedModule } from '@app/shared/shared.module';

const COMPONENTS = [StatisticsComponent];

export const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: StatisticRevenueComponent
      }
    ]
  }
];

const MODULES = [RouterModule.forChild(routes), SharedModule, CommonModule];

@NgModule({
  declarations: [...COMPONENTS, StatisticRevenueComponent],
  imports: [...MODULES],
exports: [...COMPONENTS, StatisticRevenueComponent]
})
export class StatisticsModule { }
