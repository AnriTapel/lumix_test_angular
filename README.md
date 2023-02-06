# LumixTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Used API

To implement given task was used [Gutendex API](https://gutendex.com) - JSON web API for Project Gutenberg ebook metadata.
Endpoint: `https://gutendex.com/books`, GET-parameter topic - string param to specify books subject.

## Output result limitation

The output result limit is configured by injection token `FETCH_LIMIT_TOKEN` and by default is 10 books per query. Note that this limit does not apply to the query itself because API doesn't provide such parameter. This limit is applied to retrieve the result output.

## Next chunck loading

Infinite scroll is implemented by loading next chunk of data for the current query. As soon as the user scrolls down to bottom of viewport, URL with next chunk (if such exists) is getting requested.