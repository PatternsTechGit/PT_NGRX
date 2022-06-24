import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./reducers/appstate.reducers";

export const selectGlobalState = createFeatureSelector<AppState>('globalState');

export const isLoggedIn = createSelector(
    selectGlobalState,
    (globalState) => !!globalState.loggedInUser
); 

export const loggedInUser = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser
);

export const loggedInUserRole = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser?.roles[0]
);

export const isLoggedInUserManager = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser?.roles.includes('bank-manager')
);

export const isLoggedInUserAccountHolder = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser?.roles.includes('account-holder')
);

export const loggedInUserName = createSelector(
    selectGlobalState,
    (globalState) => globalState.loggedInUser?.firstName + ' ' + globalState.loggedInUser?.lastName
);