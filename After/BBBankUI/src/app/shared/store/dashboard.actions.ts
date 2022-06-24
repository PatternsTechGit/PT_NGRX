import { createAction, props } from "@ngrx/store";
import { LineGraphData } from "../models/line-graph-data";

  // This is example of an action which is more of a command than an event. 
  export const loadLast12MonthsBalances = createAction(
    '[SharedComponent] On Component Load',
    props<{ userId: string }>()
  );

  export const last12MonthsBalancesLoaded = createAction(
    '[DashBoard Effect] Last 12 Month Balances Loaded',
    props<{ lineGraphData: LineGraphData }>(),
  );

  export const last12MonthsBalancesLoadError = createAction(
    '[DashBoard Effect] Last 12 Month Balances Load Error'
  );