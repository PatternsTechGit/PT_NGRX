import { Component } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login()
      .subscribe((user) => {
        console.log(`Is Login Success: ${user}`);

        if (user) {
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
