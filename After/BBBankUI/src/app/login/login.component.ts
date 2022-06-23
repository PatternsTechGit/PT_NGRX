import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import AuthService from '../shared/services/auth.service';
import { AuthActions } from '../store/auth.action.types';
import { AppState } from '../store/reducers/appstate.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  login() {
    this.authService.login()
      .subscribe((user) => {
        console.log(`Is Login Success: ${user}`);

        if (user) {
          this.store.dispatch(AuthActions.loginSuccess({ loggedInUser: user }));
          this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });

          if (user.roles[0] === 'bank-manager') {
            this.router.navigate(['/bank-manager'])
              .then(() => {
                window.location.reload();
              });
          }
          if (user.roles[0] === 'account-holder') {
            this.router.navigate(['/account-holder'])
              .then(() => {
                window.location.reload();
              });
          }
          
       
        }
      });
  }
}
