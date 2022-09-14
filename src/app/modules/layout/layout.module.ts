import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { SidebarLayoutComponent } from './components/sidebar-layout/sidebar-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';

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
  NavbarMenuComponent
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([]),
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class LayoutModule { }
