import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedInUserManager, isLoggedInUserAccountHolder } from 'src/app/store/auth.selectors';
import { AppState } from 'src/app/store/reducers/appstate.reducers';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export default class SidenavComponent implements OnInit {
  loggedInUserRole: string;
  isLoggedInUserManager$: Observable<boolean>;
  isLoggedInUserAccountHolder$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.isLoggedInUserManager$ = this.store
    .pipe(
      select(isLoggedInUserManager)
    );
    this.isLoggedInUserAccountHolder$ = this.store
    .pipe(
      select(isLoggedInUserAccountHolder)
    );
    
    // eslint-disable-next-line prefer-destructuring
    //this.loggedInUserRole = JSON.parse(localStorage.getItem('loggedInUser')).roles[0];
  }
}
