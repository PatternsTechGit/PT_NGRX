import { Component, OnInit } from '@angular/core';
import AuthService from '../services/auth.service';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedInUserAccountHolder, isLoggedInUserManager } from '../../store/auth.selectors'//' src/app/store/auth.selectors';
import { AppState } from '../../store/reducers/appstate.reducers';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export default class SidenavComponent implements OnInit {
  isLoggedInUserManager$: Observable<boolean>;
  isLoggedInUserAccountHolder$: Observable<boolean>;
  constructor(private authService: AuthService,
    private store: Store<AppState>) {

  }

  ngOnInit(): void {
    // in this case we dont need the value of a select observable instead we need to assign select observable to our local observable variable.
    // instead of doing subscribe here we will use  | async pipe in html to auto subscribe to results of these select observables. 
    this.isLoggedInUserManager$ = this.store
    .pipe(
      select(isLoggedInUserManager)
    );
    this.isLoggedInUserAccountHolder$ = this.store
    .pipe(
      select(isLoggedInUserAccountHolder)
    );
  }
}
