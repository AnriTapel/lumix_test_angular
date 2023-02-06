export interface Book {
    id: number;
    title: string;
    subjects: Array<string>;
    bookshelves: Array<string>;
    download_count: number;
}