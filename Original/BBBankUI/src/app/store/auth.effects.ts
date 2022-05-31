import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { AuthActions } from "./auth.action.types";

// Action gets dispatched and its related function is trigger in reducer. but we want to do something else as well on the side of it as a result of Action dispatch and reducer.
// That is handled by Effects. One thing effects are commonly used for is synchronizing data between store and back end service. Means when the action is performed the communication with the api can be handled in Effects.
// But Right now we will use it to keep value of the store intact between browser refreshes. 

@Injectable()
export class AuthEffects {

    // createEffect will auto subscribe this.actions$ so we dont have to manually subscribe to it. Using createEffect also adds some error handling. 
    // actions$ is an Observable form ngRx and we can subscribe to it to get notified  when an action is performed. 
    login$ = createEffect(() => this.actions$
    // Value emitted by this observable is Actions.
        .pipe(ofType(AuthActions.loginSuccess),
            tap(action => {
                // We can check if(action.type == "[Login Page]") etc but using ofType(AuthActions.loginSuccess) makes it type safe and we can use it as action.loggedInUser
                // on an action of loginSuccess we are going to store the value of loggedInUser in browser storage 
                // in the app load (in app.component's load method) we will put this value pack in store when application loads
                localStorage.setItem('loggedInUser', JSON.stringify(action.loggedInUser));
            })
        ),
        // To avoid infinite loop
        { dispatch: false });

    logout$ = createEffect(() => this.actions$
        .pipe(ofType(AuthActions.logout),
            tap(action => {
                localStorage.removeItem('loggedInUser');
               // this.authService.logout();
            })
        ),
        { dispatch: false });

    constructor(private actions$: Actions,
        ) {


    }
}