import { NgModule } from '@angular/core';
import {
  LookupValuePipe,
  SanitizeHtmlPipe,
  StringToDatePipe,
  TimeAgoPipe
} from './pipes';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { SwiperTemplateComponent } from './components/swiper-template/swiper-template.component';
import { RouterModule } from '@angular/router';
import { ZoomImageComponent } from './components/zoom-image/zoom-image.component';
import { CheckBoxListComponent } from './components/check-box-list/check-box-list.component';
import { CategoryExpansionComponent } from './components/category-expansion/category-expansion.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { AreaChartComponent } from './components/chart/area-chart/area-chart.component';
import { LineChartComponent } from './components/chart/line-chart/line-chart.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';

const COMPONENTS: any[] = [
  SvgIconComponent,
  SwiperTemplateComponent,
  ZoomImageComponent,
  CheckBoxListComponent,
  CategoryTreeComponent,
  CategoryExpansionComponent,
  AreaChartComponent,
  LineChartComponent,
  ConfirmDialogComponent
];

const MATERIALS: any[] = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
];

const PIPES = [
  StringToDatePipe,
  SanitizeHtmlPipe,
  TimeAgoPipe,
  LookupValuePipe
];

@NgModule({
  imports: [
    ...MATERIALS,
    CommonModule,
    SwiperModule,
    FormsModule,
    MatDialogModule,
    NgApexchartsModule,
    RouterModule.forChild([])
  ],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES, ...MATERIALS],
  providers: [
    { provide: MatDialogRef, useValue: {} },

    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class SharedModule {}
