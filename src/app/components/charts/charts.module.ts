import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartNowComponent } from './chart-now/chart-now.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ChartNowComponent
  ]
})
export class ChartsModule { }