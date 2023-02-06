import { Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { map, of, switchMap } from "rxjs";
import { catchError, withLatestFrom } from "rxjs/operators";
import { QueryResult } from "src/app/state/books/books.state";
import { BooksService } from "src/app/service/books.service";
import { AppState } from "../app.state";
import { loadDataError, loadNextDataChunk, loadNextDataChunkSuccess, loadQueryInitialData, loadQueryInitialDataSuccess } from "./books.actions";
import { selectAllResults } from "./books.selectors";

@Injectable()
export class BooksEffects {

    constructor(
        private actions$: ActionsSubject,
        private store: Store<AppState>,
        private booksService: BooksService
    ){
    }
    
    loadResultsByQuery$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadQueryInitialData),
            withLatestFrom(this.store.select(selectAllResults)),
            switchMap(([action, data]) => 
                this.booksService.resolveQuery(action.query, data[action.query]).pipe(
                    map((output: QueryResult) => loadQueryInitialDataSuccess({result: output})),
                    catchError(() => of(loadDataError()))
                )
            )
        )
    );

    loadNextChunkByUrl$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadNextDataChunk),
            switchMap((action) => 
                this.booksService.fetchApi(action.url).pipe(
                    map((result: QueryResult) => loadNextDataChunkSuccess({result})),
                    catchError(() => of(loadDataError()))
                )
            )
        )
    );
}
