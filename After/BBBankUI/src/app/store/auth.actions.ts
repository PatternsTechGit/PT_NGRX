
import { createAction, props } from "@ngrx/store";
import AppUser from "../shared/models/app-user";

export const loginSuccess = createAction(
    '[Login Component] Login Success',
    props<{ loggedInUser: AppUser }>(),
  );
  
  export const logout = createAction(
    '[Top Menu] Logout',
  );

  export const appLoad = createAction(
    '[App Component] App Load',
    props<{ loggedInUser: AppUser }>(),
  );
  