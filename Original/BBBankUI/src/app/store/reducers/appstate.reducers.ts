import { Action, ActionReducerMap, createAction, createReducer, on } from '@ngrx/store'
import AppUser from '../../shared/models/app-user';
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

