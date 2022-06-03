import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, timer } from 'rxjs';
import { AppState } from '../../store/reducers/appstate.reducers';
import { LineGraphData } from '../models/line-graph-data';
import TransactionService from '../services/transaction.service';
import { last12MonthsBalancesSelector, last6MonthsBalancesSelector } from '../store/dashboard.selectors'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent implements OnInit {
  lineGraphData: LineGraphData;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

       this.store.select(last12MonthsBalancesSelector)
      .subscribe((result: any) => {

        if (result != null) {
          this.lineGraphData = result;
        }
      });

  }
}
