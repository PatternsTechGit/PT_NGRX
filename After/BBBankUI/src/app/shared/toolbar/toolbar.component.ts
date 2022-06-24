import {
  Component, Input, OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthActions } from 'src/app/store/auth.action.types';
import { AppState } from 'src/app/store/reducers/appstate.reducers';
import AppUser from '../models/app-user';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export default class ToolbarComponent implements OnInit {
  // @ts-ignore: Object is possibly 'null'.
  @Input() inputSideNav: MatSidenav;
  loggedInUser?: AppUser;
  sub: Subscription;

  constructor(private authService: AuthService, private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.sub = this.store
    .select('loggedInUser')
    .subscribe((loggedInUser: any) => {
        if (loggedInUser != null) {
            this.loggedInUser = loggedInUser;
        }
    });
    //this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    //this.authService.logout();
  }
}
