import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LineGraphData } from '../models/line-graph-data';
import { last6MonthsBalancesSelector } from '../store/dashboard.selectors';
import { SharedState } from '../store/reducer/shared.reducers';

@Component({
  selector: 'app-last6-month-dashboard',
  templateUrl: './last6-month-dashboard.component.html',
  styleUrls: ['./last6-month-dashboard.component.css']
})
export class Last6MonthDashboardComponent implements OnInit {
  lineGraphDataLast6Month: LineGraphData;
  constructor(private sharedStore: Store<SharedState>) { }

  ngOnInit(): void {
    
    this.sharedStore
      .select(last6MonthsBalancesSelector)
      .subscribe((result: any) => {
        if (result != null) {
          this.lineGraphDataLast6Month = result;
        }
      });
  }
}