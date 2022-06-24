import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concatMap, map, catchError, of } from "rxjs";
import TransactionService from "../services/transaction.service";
import { DashBoardActions } from "./action-types";
import { SharedState } from "./reducer/shared.reducers";

@Injectable()
export class DashBoardEffects {
    loadLast12MonthsBalances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashBoardActions.loadLast12MonthsBalances),
      concatMap((action) =>
        this.transactionService.getLast12MonthBalances(action.userId).pipe(
/*           tap((data) => {
            this.notifyService.showSuccess(
              'Last Three Year Balances Loaded',
              'Success'
            );
          }), */
          map((lineGraphData) =>
          DashBoardActions.last12MonthsBalancesLoaded({ lineGraphData })
          ),
           catchError((err) => {
         /*    this.notifyService.showError(
              'Error While Loading Last Three Year Balances',
              'Error'
            ); */
            return of(DashBoardActions.last12MonthsBalancesLoadError());
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<SharedState>,
    private transactionService: TransactionService
  ) {}
}