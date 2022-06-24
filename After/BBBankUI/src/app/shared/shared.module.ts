import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import SidenavComponent from './sidenav/sidenav.component';
import ToolbarComponent from './toolbar/toolbar.component';
import DashboardComponent from './dashboard/dashboard.component';
import SharedComponent from './shared.component';
import { StoreModule } from '@ngrx/store';
import * as fromShared from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { DashBoardEffects } from './store/dashboard.effects';
import { Last6MonthDashboardComponent } from './last6-month-dashboard/last6-month-dashboard.component';

@NgModule({
  declarations: [SidenavComponent, ToolbarComponent, DashboardComponent, SharedComponent, Last6MonthDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    // StoreModule.forFeature(fromShared.sharedFeatureKey, fromShared.sharedReducer, {}),
    EffectsModule.forFeature([DashBoardEffects]),
    StoreModule.forFeature(fromShared.sharedFeatureKey, fromShared.reducers, { metaReducers: fromShared.metaReducers }),
  ],
  // eslint-disable-next-line max-len
  exports: [SharedComponent], // all exported components from here will be available where shared modules is imported.
})
export default class SharedModule { }
