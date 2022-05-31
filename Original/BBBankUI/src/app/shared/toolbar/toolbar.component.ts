import {
  Component, Input, OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import AppUser from '../models/app-user';
import AuthService from '../services/auth.service';
import { AppState } from "../../store/reducers/appstate.reducers"
import { Subscription } from 'rxjs';
import { AuthActions } from '../../store/auth.action.types';
import {loggedInUser} from '../../store/auth.selectors';
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
  constructor(private authService: AuthService,private store: Store<AppState>) {
    
  }

  ngOnInit(): void {
    // this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
     this.sub = this.store
       .select(loggedInUser)
       .subscribe((loggedInUser: any) => {
           if (loggedInUser != null) {
               this.loggedInUser = loggedInUser;
           }
       });
   }
 
   logout(): void {
     this.store.dispatch(AuthActions.logout());
   }
}
