import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable, debounceTime, map, fromEvent, filter, distinct } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { QueryResult, QueryStatus } from './state/books/books.state';
import { AppState } from './state/app.state';
import { loadNextDataChunk } from './state/books/books.actions';
import { selectCurrentResult, selectQueryStatus } from './state/books/books.selectors';
import { Book } from './models/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  
  private scrollEventSubscription!: Subscription;
  private statusSubscription: Subscription | undefined;

  public queryStatus: QueryStatus | undefined;
  public filteredOptions$!: Observable<Array<string>>;
  public currentResult$!: Observable<QueryResult | undefined>;

  constructor(private store: Store<AppState>) {
    this.currentResult$ = this.store.select(selectCurrentResult);    
  }

  ngOnInit(): void {
    this.statusSubscription = this.store.select(selectQueryStatus)
      .subscribe(status => this.queryStatus = status);

    this.scrollEventSubscription = fromEvent(window, 'scroll').pipe(
        filter(() => Math.ceil(window.innerHeight + window.scrollY) >= document.body.clientHeight),
        debounceTime(200),
        distinct(),
        withLatestFrom(this.currentResult$),
        filter(([event, current]) => current?.next !== undefined),
        map(([event, current]) => current!.next)
      ).subscribe(res => this.infinitScrollHandler(res!));
  }

  ngOnDestroy(): void {
    this.statusSubscription?.unsubscribe();
    this.scrollEventSubscription?.unsubscribe();
  }

  public trackByBookId(index: number, book: Book): number {
    return book.id;
  }

  public isNotificationVisible(): boolean {
    return this.queryStatus === 'error' || this.queryStatus === 'loading';
  }

  private infinitScrollHandler(url: string): void {
    this.store.dispatch(loadNextDataChunk({url}))
  }
}
