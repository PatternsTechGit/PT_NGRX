import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoggedIn, loggedInUser } from '../store/auth.selectors';
import { AppState } from '../store/reducers/appstate.reducers';
import AppUser from './models/app-user';
import { DashBoardActions } from './store/action-types';
import { SharedState } from './store/reducer/shared.reducers';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css'],
})
export default class SharedComponent implements OnInit {
  isUserLoggedIn?: boolean;
  isUserLoggedIn$: Observable<boolean>;
  loggedInUserSub: Subscription;

  constructor(private appStore: Store<AppState>, private sharedStore: Store<SharedState>) { }

  ngOnInit(): void {
    this.isUserLoggedIn$ = this.appStore
    .pipe(
      select(isLoggedIn)
    );

    this.loggedInUserSub = this.appStore
    .select(loggedInUser)
    .subscribe((user: AppUser) => {
      if (user != null) {
        this.sharedStore.dispatch(DashBoardActions.loadLast12MonthsBalances({ userId: user?.roles.includes('bank-manager') ? null : user?.id }));
      }
    });
    //this.isUserLoggedIn = localStorage.getItem('loggedInUser') != null;
  }
  
  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }
}
