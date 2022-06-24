import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import TransactionService from './shared/services/transaction.service';
import SharedModule from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthEffects } from './store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/appstate.reducers';

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
    //StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true, 
        strictActionImmutability: true, 
        strictActionSerializability: true, 
        strictStateSerializability: true, 
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production, 
    }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent],
})
export default class AppModule { }
