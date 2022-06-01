# State management with NGRX 

## What Is Ngrx?

[NgRx](https://auth0.com/blog/state-management-in-angular-with-ngrx-1/) is a framework for building reactive applications in Angular. NgRx is inspired by the Redux pattern - unifying the events in your application and deriving state using RxJS. At a high level, NgRx stores a single state and uses actions to express state changes. NgRx excels in managing complex states, making it ideal for applications with a lot of user interactions and multiple data sources.

## How Does Ngrx Work
NgRx is made up of 5 main components - Store, Actions, Reducers, Selectors, and Effects.

NgRx uses the Redux concept of unidirectional data flow, where all application data goes through the same lifecycle. This unidirectional data flow makes the application's state more predictable and thus easier to understand. This flow only applies to the state management layer and is not to be confused with the unidirectional data flow of the presentation layer. The following diagram shows the state management lifecycle in NgRx.

![111](https://user-images.githubusercontent.com/100709775/171422012-1688daef-4b20-452e-b776-1c3224ded22f.PNG)



## Store

You can think of this as a client-side database. The Store in NgRx acts as the application's single source of truth. It reflects the current state of the app.

## Actions
Actions express unique events that happen in our application. These events range from application lifecycle events, user interactions, to network requests. Actions are how the application communicates with NgRx to tell it what to do.

## Reducers
Reducers are responsible for handling transitions between states. Reducers react to the Actions dispatched and executes a pure function to update the Store. Pure functions are functions that are predictable and have no side effects. Given the same set of inputs, a pure function will always return the same set of outputs.

## Selectors
Selectors are pure functions for getting slices of the state from the Store. Selectors are how our application can listen to state changes.

## Effects
Effects handle the side effects of each Action. These side effects range from communicating with an external API via HTTP when a certain Action is dispatched to dispatching another Action to update another part of the State.


## About this exercise

Previously we scaffolded a new Angular application in which we have integrated

* Scaffolded the angular application
* FontAwesome Library for icons
* Bootstrap Library for styling buttons
* Bootstrap NavBar component
* We have multiple components e.g. (CreateAccountComponent,   ManageAccountsComponent, DepositFundsComponent, TransferFundsComponent) in our application for which we have already configured routing.
* SideNav having links which are navigating to these components.
* We developed a base structure of an api solution in Asp.net core that have just two api functions GetLast12MonthBalances & GetLast12MonthBalances/{userId} which returns data of the last 12 months total balances.
* There is an authorization service with two functions Login & Logout, The login function is setting up a hardcoded user properties (Name,Email,Roles) and storing it in local storage where as logout function is removing that user object from local storage.
* Links on the sideNav are shown or hidden based on the logged in user's role
*  We also have a toolbar that shows Logged in User's Name.

The Dashboard page shows the received data for API as below 

![1234](https://user-images.githubusercontent.com/100709775/169295406-a807dad7-ff7b-4356-bb50-bf816b24b41d.png)


## In this exercise

 * We will implement `store` for global state. 
 * We will implement user related `Actions` and `Reducers` functions against each actions.
 * We will implement `Effects` against the required action.
 * We will implement multiple `selectors` for LoggedInUser.
 * We will implement separate `store` for shared state. 
 * We will implement dashboard related `Actions` and `Reducers` functions against each shared actions.
 * We will implement `Effects` against the required shared action.
 * We will implement multiple `selectors` for required data.


 Here are the steps to begin with 


## Install NgRx Library
To start the NgRx we will first install the NgRx libraries.

`@ngrx/store` is used to create a store in our application.
 Install the store using command as below :
```
ng add @ngrx/store
```

`@ngrx/store-devtools` provides developer tools and instrumentation for Store. Install the devtools using command as below :

```
ng add @ngrx/store-devtools
```
 `@ngrx/schematics@latest`  provides Angular CLI commands for generating files when building new NgRx feature.

```
ng add @ngrx/schematics@latest
```

`@ngrx/effects` is used for interacting with external resources directly through services. Install the effects using command as below :

```
npm install @ngrx/effects --save
```

# Create Global Store 
The global store will contains the loggedIn user related information and will be accessible throughout the application. The `Login component` will be dispatching the `loginSuccess` action whereas the `Toolbar component` will be subscribing the `loggedInUser` selectors of Global store.

 Here are the steps to start with: 

## Step 1 : Setting Up Auth Action

We will create a new folder `store` in app directory which will contains the global state of store.

Create a new file in store folder named `auth.actions.ts`. This file will contains the user related actions in one file. 

Here `loginSuccess` action will be used for user login which will be dispatched from Login component whereas `logout` action will be used for user logout which will be dispatched from Top Menu component. `appLoad` will be used for setting the user state.

Here is the code as below :

```ts
import { createAction, props } from "@ngrx/store";
import AppUser from "../shared/models/app-user";

// All related action in one file.
// [in Brackets we mention that where this action is expected to be originated from]
// Action might also contain a pay load. Pay load creates a new version of the internal state of the store.
export const loginSuccess = createAction(
    '[Login Component] Login Success',
    // prop function takes in a Generic to mention the type of parameter associated with the action.
    props<{ loggedInUser: AppUser }>(),
  );
  
  // Example of action that has that has no pay load. Its just reporting that something has happened at the level of a component. 
  export const logout = createAction(
    '[Top Menu] Logout',
  );

  export const appLoad = createAction(
    '[App Component] App Load',
    props<{ loggedInUser: AppUser }>(),
  );
  
```

##  Step 2 : Setting Up Global Reducer

We will create a new folder `reducers` in store directory and then create a new file named `appstate.reducers.ts` which will contain the reducer functions for each global actions e.g. `loginSuccess`, `logout` and `appLoad`.

Here the reducer functions will be setting up the new value of loggedInUser on  loginSuccess and appLoad event whereas it will set loggedInUser as undefined on logout event. 

Here is the code as below : 

```ts
import { Action, ActionReducerMap, createAction, createReducer, on } from '@ngrx/store'
import AppUser from 'src/app/shared/models/app-user';
import { AuthActions } from '../auth.action.types';

//  App State corresponds to global application state. 
export interface AppState {
  // all different type of properties that will be managed by Application an global level will be listed here. 
  // first of such property is loggedInUser.
  loggedInUser: AppUser
}

// We have to set initial value of all the items inside the AppState
export const initialGlobalState: AppState = {
  loggedInUser: undefined,
};

export const authReducer = createReducer(
  initialGlobalState,

  // a reducer is function that takes in current state of the store and action that was just dispatched to the store.
  // reducer just takes in the current value of properties of state and returns the next (or changed) value of state. 
  // but if you want to do something extra other than simple returning the next value,  you do it in effects.
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      // when this action is called the value of the store for property "loggedInUser" will be changed to value of that is passed in as action's payload.
      // so the value of the loggedInUser will be stored in memory and can be accessed later on. 
      loggedInUser: action.loggedInUser,
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      loggedInUser: undefined,
    };
  }),

  on(AuthActions.appLoad, (state, action) => {
    return { 
      loggedInUser: action.loggedInUser,
    };
  }),
);
// Reducer does not directly modifies the state. In fact they calculate the new version of the state based on the previous state and the action that just got dispatched. 
// and a reducer is going to return a new version of the store state.
export const reducers: ActionReducerMap<{ globalState: AppState }> = {
  // all of the data related to AppSate will be stored inside "globalState" property inside the store.
  globalState: authReducer,
};
```
##  Step 3 : Setting Up Action Types

Create a new file in store folder named `auth.action.types.ts`. In this file we will be Grouping the auth actions so we can access them easily.  

Here is the code as below : 

```ts
// Grouping the related actions so we can access them easily. 
// So we import everything from the auth.actions file
import * as AuthActions from './auth.actions';

// Now we will have these actions grouped under AuthActions throughout the application and available through intellisense  
export { AuthActions };
```

## Step 4 :  Setting Up Auth Effects 

Create a new file in store folder named `auth.effects.ts`. this file will contain the side effects which is used for  interacting with external resources directly through services.

In our case we will be storing the loggedInUser value in local storage on `loginSuccess` and removing the loggedInUser value from local storage
on `logout` event.

Here is the code as below : 

```ts
import { Injectable } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { AuthActions } from "./auth.action.types";

// Action gets dispatched and its related function is trigger in reducer. but we want to do something else as well on the side of it as a result of Action dispatch and reducer.
// That is handled by Effects. One thing effects are commonly used for is synchronizing data between store and back end service. Means when the action is performed the communication with the api can be handled in Effects.
// But Right now we will use it to keep value of the store intact between browser refreshes. 

@Injectable()
export class AuthEffects {

    // createEffect will auto subscribe this.actions$ so we don't have to manually subscribe to it. Using createEffect also adds some error handling. 
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
                this.authService.logout();
            })
        ),
        { dispatch: false });

    constructor(private actions$: Actions,
        private authService: MsalService) {


    }
}
```

##  Step 5 :  Setting Up Selectors

Create a new file in store folder named `auth.selectors.ts`. This file will contain multiple selectors that will emit a new value to the store only if the value was changed. 

Here we have multiple selectors like 

 `isLoggedIn` returns true or false by checking the user state from loggedInUser.

 `loggedInUser` returns entire object of loggedInUser.

 `loggedInUserRole` returns first entry of roles array of loggedInUser.

 `isLoggedInUserManager`returns true if the loggedInUser role is bank-manager.

 `isLoggedInUserAccountHolder` returns true if the loggedInUser role is account-holder.

 `loggedInUserName` returns the full name of loggedInUser.


Here is the code as below : 

```ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./reducers/appstate.reducers";

// Using selectors we want to only emit a new value to the store only if the value was changed. 
// map(state => !!state['globalState'].loggedInUser)
// Above mentioned function used in shared.component is a pure mapping function. It takes in an input and gives output. If input doesn't change that output don't change as well. 
// So we want to perform the mapping operation for a given input and want to keep its output in memory until input changes. This is done through selectors.

// Defining state => state['globalState'] in an Type Safe way.
export const selectGlobalState = createFeatureSelector<AppState>('globalState');


export const isLoggedIn = createSelector(
    // In the first argument we are going to access the entire state and from there a slice of the state i.e. is the globalState property. We can even select more slices of state for example state['something']
    // state => state['globalState']
    selectGlobalState,
    // (globalState) will have all the slices of state that were selected in first argument from there we are going to access loggedInUser property and just like before we will double negate it
    // globalState.loggedInUser this type safety is achieved by using featureSelector
    (globalState) => !!globalState.loggedInUser
); 

// returns entire object of loggedInUser
export const loggedInUser = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser
);


// returns first entry of roles array
export const loggedInUserRole = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser?.roles[0]
);

// returns true or false 
export const isLoggedInUserManager = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser?.roles.includes('bank-manager')
);

// returns true or false 
export const isLoggedInUserAccountHolder = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser?.roles.includes('account-holder')
);

// loggedIn User Name
export const loggedInUserName = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser?.firstName + ' ' + globalState.loggedInUser?.lastName
);

```

## Step 6 :  Setting Up App Module
Go to `app.module.ts` and added reducer reference in imported `StoreModule` to Plugging in the reducers for root module.
Also we will be injecting Effects of this module in `EffectsModule` 

Add `storeModule` and `effectsModule` in imports as below 

```ts
 // Plugging in the reducers for root module.
   StoreModule.forRoot(reducers, {
    // Meta reducers are just like normal reducers but they will be executed before the normal reducers. They can be used for example for logging purpose
    runtimeChecks: {
      // This is to avoid bugs in state management that will be later hard to troubleshoot.
      strictStateImmutability: true, // no where in the code we can change store state manually.
      strictActionImmutability: true, // store cannot modify action
      strictActionSerializability: true, // action must only include plain objects not something like date
      strictStateSerializability: true, // state is always serializable. (plain object)
    }
  }),
  StoreDevtoolsModule.instrument({
    maxAge: 25, // Retains last 25 states of store
    logOnly: environment.production, // Restrict extension to log-only mode
  }),
  // Injecting Effects of this module
  EffectsModule.forRoot([AuthEffects])
```



##  Step 7 : Dispatch loginSuccess Action

Go to `login.component.ts` and create `Store<AppState>` object in constructor.
Call the `loginSuccess` action on login event as below :

```ts 

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private store: Store<AppState>) { }

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

```

## Step 8 :  Subscribe Global State & Dispatch logout Action

Go to `toolbar.component.ts` and create `Store<AppState>` object in constructor.
Subscribe the global Appstate and select `loggedInUser` to get the loggedInUser from state. 

Call the `logout` action on logout event as below :

```ts 

export default class ToolbarComponent implements OnInit {
   loggedInUser?: AppUser;
  sub: Subscription;
  constructor(private authService: AuthService,private store: Store<AppState>) {}

  ngOnInit(): void {
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
```
##  Step 9 : Setting Up SideNav Component
Go to `sidenav.component.ts` and create `Store<AppState>` object in constructor. we will create `isLoggedInUserManager` and `isLoggedInUserAccountHolder`observables as below :

```ts
export default class SidenavComponent implements OnInit {
  isLoggedInUserManager$: Observable<boolean>;
  isLoggedInUserAccountHolder$: Observable<boolean>;
  constructor(private authService: AuthService,
    private store: Store<AppState>) {

  }

  ngOnInit(): void {
    // in this case we don't need the value of a select observable instead we need to assign select observable to our local observable variable.
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
```
 Then we will use async pipe in html to auto subscribe to results as below :

 ```html
 <div class="sidenav">
    <div class="logo">
        <a href="/" class="simple-text logo-mini">
            <div class="logo-img">
                <img src="./assets/images/angular2-logo-white.png" />
            </div>
        </a>
        <a *ngIf="isLoggedInUserAccountHolder$ | async" href="/account-holder" class="simple-text logo-normal">
            BBBank
        </a>
        <a *ngIf="isLoggedInUserManager$ | async" href="/bank-manager" class="simple-text logo-normal">
            BBBank
        </a>
    </div>
    <ul class="nav">
        <li *ngIf="isLoggedInUserAccountHolder$ | async"><a [routerLink]="['/account-holder']"><i class="active fas fa-chart-line"></i> Dashboard</a></li>
        <li *ngIf="isLoggedInUserManager$ | async"><a [routerLink]="['/account-holder']"><i class="active fas fa-chart-line"></i> Dashboard</a></li>
        <div>
            <li *ngIf="isLoggedInUserAccountHolder$ | async"><a
                    [routerLink]="['account-holder/transfer-funds', { fromAccountId: '111', toAccountId: '222' }]"><i
                        class="fas fa-random"></i> Transfer Funds</a></li>
            <li *ngIf="isLoggedInUserAccountHolder$ | async"><a [routerLink]="['account-holder/deposit-funds']"><i
                        class="fas fa-money-check-alt"></i>Deposit Funds</a></li>
            <li *ngIf="isLoggedInUserManager$ | async"><a [routerLink]="['bank-manager/create-account']"><i
                        class="fas fa-user"></i> Create New Account</a></li>
            <li *ngIf="isLoggedInUserManager$ | async"><a [routerLink]="['bank-manager/manage-accounts']"><i
                        class="fas fa-users"></i> Manage Accounts</a></li>
        </div>
    </ul>
</div>
 ```



##  Step 10 : Setting Up App Component
Go to `app.component.ts` and create `Store<AppState>` object in constructor.
As the page will be reloaded after login success, Once the page is reloaded then saved NgRx state is disposed automatically. So we will get the loggedInUser value from local storage on `ngOnInit` and then set the value using `appLoad` dispatch action as below :

```ts
  export default class AppComponent implements OnInit {
    constructor(private store: Store<AppState>) {}
    
  ngOnInit(): void {
    let UserLoggedIn = localStorage.getItem('loggedInUser');
    this.store.dispatch(
      AuthActions.appLoad({ loggedInUser: JSON.parse(UserLoggedIn) })
    );
  }

  title = 'BBBankUI';
}
```


 
