import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LineGraphData } from '../models/line-graph-data';
import TransactionService from '../services/transaction.service';
import { last12MonthsBalancesSelector } from '../store/dashboard.selectors';
import { SharedState } from '../store/reducer/shared.reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent implements OnInit {
  lineGraphData: LineGraphData;
  lineGraphDataLast6Month: LineGraphData;

  constructor(private transactionService: TransactionService, private sharedStore: Store<SharedState>) { }

  ngOnInit(): void {
    this.sharedStore
    .select(last12MonthsBalancesSelector)
    .subscribe((result: any) => {

      if (result != null) {
        this.lineGraphData = result;
      }
    });
    
    // this.transactionService
    //   .getLast12MonthBalances('37846734-172e-4149-8cec-6f43d1eb3f60')
    //   .subscribe({
    //     next: (data) => {
    //       this.lineGraphData = data;
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });
  }
}
