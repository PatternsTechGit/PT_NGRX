import { ActionReducerMap, createReducer, on,  } from "@ngrx/store";
import AppUser from "src/app/shared/models/app-user";
import { AuthActions } from "../auth.action.types";
import {  } from '../auth.actions';

export interface AppState {
    loggedInUser: AppUser
  }
  
  export const initialGlobalState: AppState = {
    loggedInUser: undefined,
  };
  
  export const authReducer = createReducer(
    initialGlobalState,
    on(AuthActions.loginSuccess, (state, action) => {
      return {
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
  export const reducers: ActionReducerMap<{ globalState: AppState }> = {
    globalState: authReducer,
  };