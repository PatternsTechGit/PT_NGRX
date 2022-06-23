import { Injectable } from "@angular/core";
import {  Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import AuthService from "../shared/services/auth.service";
import { AuthActions } from "./auth.action.types";
// import { MsalService } from "@azure/msal-angular";

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => this.actions$
        .pipe(ofType(AuthActions.loginSuccess),
            tap(action => {
                localStorage.setItem('loggedInUser', JSON.stringify(action.loggedInUser));
            })
        ),
        { dispatch: false });
    logout$ = createEffect(() => this.actions$
        .pipe(ofType(AuthActions.logout),
            tap(action => {
                localStorage.removeItem('loggedInUser');
                this.authService.logout();
            })
        ),
        { dispatch: false });

    constructor(private actions$: Actions,
        private authService: AuthService) {
    }
}