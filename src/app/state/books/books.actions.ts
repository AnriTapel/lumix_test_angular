import { createAction, props } from "@ngrx/store";
import { QueryResult } from "src/app/state/books/books.state";

export const loadQueryInitialData = createAction(
    '[Books] Load initial data',
    props<{query: string}>()
)

export const loadQueryInitialDataSuccess = createAction(
    '[Books] Load initial data success',
    props<{result: QueryResult}>()
);

export const loadNextDataChunk = createAction(
    '[Books] Load next data chuck',
    props<{url: string}>()
)

export const loadNextDataChunkSuccess = createAction(
    '[Books] Load next data chuck success',
    props<{result: QueryResult}>()
)

export const loadDataError = createAction('[Books] Load data error')

export const clearCurrentResult = createAction('[Books] Clear current result');