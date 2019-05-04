import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './services/services.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ServicesModule
  ],
  declarations: []
})
export class CoreModule { }