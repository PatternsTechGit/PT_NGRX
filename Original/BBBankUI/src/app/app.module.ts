import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import TransactionService from './shared/services/transaction.service';
import SharedModule from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './store/reducers/appstate.reducers';
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './store/auth.effects';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
 // Plugging in the reducers for root module.
 StoreModule.forRoot(reducers, {
  // Meta reducers are just like normal reducers but they will be executed before the normal reducers. They can be used for example for logging purpose
  runtimeChecks: {
    // This is to avoid bugs in state management that will be later hard to troubleshoot.
    strictStateImmutability: true, // no where in the code we can change store state manually.
    strictActionImmutability: true, // store cannot modify action
    strictActionSerializability: true, // action must only include plain objects not something like date
    strictStateSerializability: true, // state is always serializable. (plain object)
  }
}),
StoreDevtoolsModule.instrument({
  maxAge: 25, // Retains last 25 states of store
  logOnly: environment.production, // Restrict extension to log-only mode
}),
// Injecting Effects of this module
EffectsModule.forRoot([AuthEffects]) ],
  providers: [TransactionService],
  bootstrap: [AppComponent],
})
export default class AppModule { }
