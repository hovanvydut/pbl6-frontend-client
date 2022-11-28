import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { SharedModule } from './shared/shared.module';
//

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  LayoutModule,
  HttpClientModule,
  SharedModule
]
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
   ...MODULES
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
