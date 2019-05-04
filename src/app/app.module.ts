import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
        BrowserModule, 
        HttpClientModule,
        FormsModule,
        LayoutsModule,
        CoreModule,
        SharedModule,
        TypeaheadModule.forRoot()
    ],
    exports: [
        CoreModule
    ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
