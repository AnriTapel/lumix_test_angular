import { createSelector } from "@ngrx/store";
import { BooksState } from "src/app/state/books/books.state";
import { AppState } from "../app.state";

const selectBooksState = (state: AppState) => state.books;

export const selectAllResults = createSelector(
    selectBooksState,
    (state: BooksState) => state.storedData
)

export const selectCurrentQuery = createSelector(
    selectBooksState,
    (state: BooksState) => state.query
)

export const selectCurrentResult = createSelector(
    selectBooksState,
    (state: BooksState) => state.current
);

export const selectQueryStatus = createSelector(
    selectBooksState,
    (state: BooksState) => state.status
);

export const selectSavedQueries = createSelector(
    selectBooksState,
    (state: BooksState) => Array.from(Object.keys(state.storedData))
)