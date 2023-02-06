import { Book } from "./book.model";

export interface ApiResopnse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Book>
}