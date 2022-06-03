import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { LineGraphData } from '../../models/line-graph-data';
import { DashBoardActions } from '../action-types';

  // all of the data related to Shared Module will be stored inside "shared" property inside the store.
  export const sharedFeatureKey = 'shared';

  export interface SharedState {
    last12MonthsBalances: LineGraphData;
  }

  
export const initialSharedState: SharedState = {
  last12MonthsBalances: null
};

export const sharedReducer = createReducer(
  initialSharedState,
  on(DashBoardActions.last12MonthsBalancesLoaded, (state, action) => {
      return {
        last12MonthsBalances: action.lineGraphData
      };
   })
);
