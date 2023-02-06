import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { booksReducer } from './state/books/books.reducer';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './state/books/books.effects';
import { FETCH_LIMIT_TOKEN } from './config';
import { BookCardComponent } from './components/book-card/book-card.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({books: booksReducer}, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([BooksEffects]),
    NoopAnimationsModule,
    
    BookCardComponent,
    NotificationComponent,
    NavBarComponent
  ],
  providers: [{provide: FETCH_LIMIT_TOKEN, useValue: {limit: 10}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
