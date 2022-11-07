import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//
import { completeIconSet } from 'src/assets/images/svg-icons.constants';
import { SharedModule } from '@app/shared/shared.module';
// component
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { SidebarLayoutComponent } from './components/sidebar-layout/sidebar-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';
import { PaginationComponent } from './components/pagination/pagination.component';
// serivce
import { SvgIconsRegistryService } from '@app/shared/services/svg-icon-registry.service';
import { BackToPreviousComponent } from './components/back-to-previous/back-to-previous.component';

const SVG_ICONS = completeIconSet;

const COMPONENTS = [
  LayoutComponent,
  FooterComponent,
  MainLayoutComponent,
  NavbarComponent,
  SearchPanelComponent,
  PageNotFoundComponent,
  AuthLayoutComponent,
  SidebarLayoutComponent,
  SidebarComponent,
  NavbarMenuComponent,
  PaginationComponent,
  BackToPreviousComponent
];

const MODULES = [
  CommonModule, SharedModule, FormsModule, RouterModule.forChild([])
]

@NgModule({
  imports: [...MODULES],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class LayoutModule {
  constructor(private svgIconRegistry: SvgIconsRegistryService) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
