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
  