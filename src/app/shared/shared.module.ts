import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
//pipes
import {
  LookupValuePipe,
  SanitizeHtmlPipe,
  StringToDatePipe,
  TimeAgoPipe
} from './pipes';
// material
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
// components
import { SwiperTemplateComponent } from './components/swiper-template/swiper-template.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { ZoomImageComponent } from './components/zoom-image/zoom-image.component';
import { CheckBoxListComponent } from './components/check-box-list/check-box-list.component';
import { CategoryExpansionComponent } from './components/category-expansion/category-expansion.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { TableComponent } from './components/table/table.component';
import { LineChartComponent, AreaChartComponent } from './components/chart';
import {
  FormDialogComponent,
  ConfirmDialogComponent
} from './components/dialog';
import { SvgIconsRegistryService } from './services/svg-icon-registry.service';
import { completeIconSet } from 'src/assets/images/svg-icons.constants';
import { ViewIconsComponent } from './components/view-icons/view-icons.component';
import { TextareaFieldComponent } from './components/form/textarea-field/textarea-field.component';
import { InputFieldComponent } from './components/form/input-field/input-field.component';
import { SelectFieldComponent } from './components/form/select-field/select-field.component';
import { ChipsFieldComponent } from './components/form/chips-field/chips-field.component';
import { AddressPipe } from './pipes/address.pipe';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { RangeSliderFieldComponent } from './components/form/range-slider-field/range-slider-field.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { CurrencyPipe } from '@angular/common';
import { PricePipe } from './pipes/price.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarTemplateComponent } from './components/form/calendar/calendar-template/calendar-template.component';
import { DialogTemplateComponent } from './components/dialog/dialog-template/dialog-template.component';

const COMPONENTS: any[] = [
  SvgIconComponent,
  SwiperTemplateComponent,
  ZoomImageComponent,
  CheckBoxListComponent,
  CategoryTreeComponent,
  CategoryExpansionComponent,
  TableComponent,
  AreaChartComponent,
  LineChartComponent,
  ConfirmDialogComponent,
  FormDialogComponent,
  ViewIconsComponent,
  InputFieldComponent,
  TextareaFieldComponent,
  SelectFieldComponent,
  ChipsFieldComponent,
  UploadImageComponent,
  RangeSliderFieldComponent
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

const SVG_ICONS = completeIconSet;

const MODULES = [
  CommonModule,
  SwiperModule,
  FormsModule,
  MatDialogModule,
  ReactiveFormsModule,
  NgApexchartsModule
];

const PROVIDERS = [CurrencyPipe,DecimalPipe, SvgIconsRegistryService];

@NgModule({
  imports: [
    ...MATERIALS,
    ...MODULES,
    NgxSliderModule,
    RouterModule.forChild([]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [...COMPONENTS, ...PIPES, ...MATERIALS, AddressPipe, PricePipe, LoadingComponent, CurrencyMaskDirective, CalendarTemplateComponent, DialogTemplateComponent],
  declarations: [...COMPONENTS, ...PIPES, AddressPipe, PricePipe, LoadingComponent, CurrencyMaskDirective, CalendarTemplateComponent, DialogTemplateComponent],
  providers: [
    ...PROVIDERS,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class SharedModule {
  constructor(private svgIconRegistry: SvgIconsRegistryService) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
