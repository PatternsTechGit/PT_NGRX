import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { isLoggedIn, loggedInUser } from '../store/auth.selectors';
import { AppState } from '../store/reducers/appstate.reducers';
import AppUser from './models/app-user';
import { DashBoardActions } from './store/action-types';
import { SharedState } from './store/reducers/shared.reducers';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css'],
})
export default class SharedComponent implements OnInit, OnDestroy {

  // Declaring Observable variable ($ postfix in variable name is convention to declare Observable.)
  isUserLoggedIn$: Observable<boolean>;
  
  loggedInUserSub: Subscription;

  constructor(private appStore: Store<AppState>, private sharedStore: Store<SharedState>) { }

  ngOnInit(): void {
    // this.store is an Observable. Just like any other Observable we can apply pipe to it
    this.isUserLoggedIn$ = this.appStore
      .pipe(
        // Here we are going to apply an operator that is going to convert current value of AppState into a boolean (as per definition of isUserLoggedIn$)
        // So we will receive AppState current value here and access the globalState property (the main property that was set in reducers) of it. 
        // And from here we are going to check if loggedInUser property is available or not
        // !! negating it 2 times will convert the expression (state['globalState'].loggedInUser) into true of false.
        // if property 'loggedInUser' is null its going to return false otherwise it will return true.
        // map(state => !!state['globalState'].loggedInUser)

        // When application grows there will be many actions that will be emitted from store and each time the value above will be re calculated. To avoid that we use concept of selectors.
        // select operator from ngRx does both. Mapping of values and elimination of duplicates. 
        select(isLoggedIn)
      );

      this.loggedInUserSub = this.appStore
      .select(loggedInUser)
      .subscribe((user: AppUser) => {
        let userId=undefined;
        if (user != null) {
          this.sharedStore.dispatch(DashBoardActions.loadLast12MonthsBalances({ userId: user?.roles.includes('bank-manager') ? null : user?.id }));
        }
      });
  }

  
  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }
}
