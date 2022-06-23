import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './store/auth.action.types';
import { AppState } from './store/reducers/appstate.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export default class AppComponent implements OnInit {
  
  isUserLoggedIn?: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    let UserLoggedIn = localStorage.getItem('loggedInUser');
    this.store.dispatch(
      AuthActions.appLoad({ loggedInUser: JSON.parse(UserLoggedIn) })
    );
    //this.isUserLoggedIn = localStorage.getItem('loggedInUser') != null;
  }

  title = 'BBBankUI';
}
