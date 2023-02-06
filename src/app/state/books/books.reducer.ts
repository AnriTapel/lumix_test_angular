import { createReducer, on } from "@ngrx/store";
import { BooksState, QueryResult } from "src/app/state/books/books.state";
import { clearCurrentResult, loadDataError, loadNextDataChunk, loadNextDataChunkSuccess, loadQueryInitialData, loadQueryInitialDataSuccess } from "./books.actions";

export const initialState: BooksState = {
    storedData: {},
    current: undefined,
    query: undefined,
    status: 'ready'
}

export const booksReducer = createReducer(
    initialState,
    on(loadQueryInitialData, (state, {query}) => ({...state, current: undefined, query, status: 'loading'})),
    on(loadQueryInitialDataSuccess, (state, {result}) => {
        if (state.storedData[state.query!]) {
            return {...state, current: result, status: 'ready'};
        }
        if (!result.data.length) {
            return {...state, status: 'ready'}
        }
        return onCommonLoadResult(state, result);
    }),
    on(loadNextDataChunkSuccess, (state, {result}) => {
        const newCurrent: QueryResult = {
            next: result.next,
            data: [...state.current!.data, ...result.data]
        }
        return onCommonLoadResult(state, newCurrent);
    }),
    on(loadNextDataChunk, (state) => ({...state, status: 'loading'})),
    on(loadDataError, (state => ({...state, status: 'error'}))),
    on(clearCurrentResult, (state) => ({...state, current: undefined, query: undefined}))
);

const onCommonLoadResult = (state: BooksState, result: QueryResult): BooksState => {
    return {
        ...state, 
        storedData: {...state.storedData, [state.query!]: result},
        current: result, 
        status: 'ready'
    }
}