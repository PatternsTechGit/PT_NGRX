import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import AuthService from '../shared/services/auth.service';
import { AuthActions } from '../store/auth.action.types';
import { AppState } from "../store/reducers/appstate.reducers"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
 
  constructor(private authService: AuthService, private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  login() {
    this.authService.login()
      .subscribe(user => {
        console.log("Is Login Success: " + user);

        if (user) {
              // Only way to modify the store is calling dispatch function. and This function takes in a value of type ngRx Action
            // Its a store who is going to decide, what to do with this action and how to modify its internal state. 
            // A component, in this case login component, only know content of the action. It does not know what store is going to do with it. 
            // Just dispatching does not chang the contents of the store. We have to tell the system what to do as a result of an action. And thats done in reducers.
        
          this.store.dispatch(AuthActions.loginSuccess({ loggedInUser: user }));
          this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
        }
      });
  }
  
}
