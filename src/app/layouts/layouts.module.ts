import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainContentComponent } from './main-content/main-content.component';

import { AppRoutesModule } from './../app-routes.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutesModule
  ],
  exports: [
    NavBarComponent,
    MainContentComponent,
  ],
  declarations: [
    NavBarComponent,
    MainContentComponent
  ]
})
export class LayoutsModule { }