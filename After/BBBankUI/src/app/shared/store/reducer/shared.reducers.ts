import { createReducer, on } from "@ngrx/store";
import { LineGraphData } from "../../models/line-graph-data";
import { DashBoardActions } from '../action-types';

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