import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ChartsModule } from './components/charts/charts.module';
import { ScreenerModule } from './components/screener/screener.module';
import { ContentsModule } from './components/contents/contents.module';

import { HomeComponent } from './components/contents/home/home.component';
import { ChartNowComponent } from './components/charts/chart-now/chart-now.component';
import { CommonComponent } from './components/contents/common/common.component';
import { ScreenNowComponent } from './components/screener/screen-now/screen-now.component';

// const routes: Routes = [
//     //{ path: '', component: HomeComponent, pathMatch: 'full' }//,
//     //{ path: 'content', loadChildren: () => ContentsModule },
//     //{ path: 'charts', loadChildren: () => ChartsModule }
// ];

const routes: Routes = [
  { path: '', component: ChartNowComponent },
  { path: 'charts', component: ChartNowComponent },
  { path: 'screen', component: ScreenNowComponent },
  { path: 'common', component: CommonComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
        ContentsModule,
        ChartsModule,
        ScreenerModule
    ],
    exports: [
        RouterModule,
        ContentsModule,
        ChartsModule,
        ScreenerModule
    ],
    declarations: []
})
export class AppRoutesModule { }