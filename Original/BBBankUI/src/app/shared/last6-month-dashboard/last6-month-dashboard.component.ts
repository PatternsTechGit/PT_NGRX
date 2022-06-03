import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/appstate.reducers';
import { LineGraphData } from '../models/line-graph-data';
import { last6MonthsBalancesSelector } from '../store/dashboard.selectors';

@Component({
  selector: 'app-last6-month-dashboard',
  templateUrl: './last6-month-dashboard.component.html',
  styleUrls: ['./last6-month-dashboard.component.css']
})
export class Last6MonthDashboardComponent implements OnInit {
  lineGraphDataLast6Month: LineGraphData;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    
    this.store
      .select(last6MonthsBalancesSelector)
      .subscribe((result: any) => {
debugger;
        if (result != null) {
          this.lineGraphDataLast6Month = result;
        }
      });
  }

}
