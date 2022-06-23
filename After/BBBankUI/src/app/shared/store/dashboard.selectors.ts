import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./reducer/shared.reducers";

export const selectSharedState = createFeatureSelector<SharedState>('shared');

export const last12MonthsBalancesSelector = createSelector(
  selectSharedState,
  (sharedState) => sharedState.last12MonthsBalances
);

export const last6MonthsBalancesSelector = createSelector(
  selectSharedState,
  (sharedState) => {
    if (sharedState.last12MonthsBalances != null) {
      let clone = { ...sharedState.last12MonthsBalances }
      clone.figures = sharedState.last12MonthsBalances.figures.slice(-6)
      clone.labels = sharedState.last12MonthsBalances.labels.slice(-6)
      return clone
    }
    return null;
  },

);