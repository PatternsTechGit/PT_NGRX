# State management with NGRX 

## What Is Ngrx?

[NgRx](https://auth0.com/blog/state-management-in-angular-with-ngrx-1/) is a framework for building reactive applications in Angular. NgRx is inspired by the Redux pattern - unifying the events in your application and deriving state using RxJS. At a high level, NgRx stores a single state and uses actions to express state changes. NgRx excels in managing complex states, making it ideal for applications with a lot of user interactions and multiple data sources.

## How Does Ngrx Work
NgRx is made up of 5 main components - Store, Actions, Reducers, Selectors, and Effects.

NgRx uses the Redux concept of unidirectional data flow, where all application data goes through the same lifecycle. This unidirectional data flow makes the application's state more predictable and thus easier to understand. This flow only applies to the state management layer and is not to be confused with the unidirectional data flow of the presentation layer. The following diagram shows the state management lifecycle in NgRx.

![01_ngrx-how-it-works](https://user-images.githubusercontent.com/100709775/169290425-4942c6c5-4dcf-455c-89f3-3b6a13dcfc97.png)


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

The Dashboard page shows the received data for API as below 

![1234](https://user-images.githubusercontent.com/100709775/169295406-a807dad7-ff7b-4356-bb50-bf816b24b41d.png)


## In this exercise

 * We will implement state management using Ngrx.

 Here are the steps to begin with 







                  

 
