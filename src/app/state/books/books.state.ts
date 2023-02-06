import { Book } from "../../models/book.model";

export type QueryStatus = 'ready' | 'loading' | 'error';

export interface QueryResult {
    next: string | undefined;
    data: Array<Book>
}

export interface BooksState {
    storedData: {[id: string]: QueryResult};
    current: QueryResult | undefined;
    status: QueryStatus;
    query: string | undefined;
}