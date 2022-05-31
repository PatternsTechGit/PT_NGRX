import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import SidenavComponent from './sidenav/sidenav.component';
import ToolbarComponent from './toolbar/toolbar.component';
import DashboardComponent from './dashboard/dashboard.component';
import SharedComponent from './shared.component';

@NgModule({
  declarations: [SidenavComponent, ToolbarComponent, DashboardComponent, SharedComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
  ],
  // eslint-disable-next-line max-len
  exports: [SharedComponent], // all exported components from here will be available where shared modules is imported.
})
export default class SharedModule { }
