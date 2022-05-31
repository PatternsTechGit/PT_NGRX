import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./reducers/appstate.reducers";

// Using selectors we want to only emit a new value to the store only if the value was changed. 
// map(state => !!state['globalState'].loggedInUser)
// Above mentioned function used in shared.component is a pure mapping function. It takes in an input and gives output. If input doesn't change that output dont change as well. 
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
