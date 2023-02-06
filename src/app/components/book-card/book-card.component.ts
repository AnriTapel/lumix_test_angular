import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {

  @Input('result')
  book!: Book;

  constructor() { }

  public getJoinedText(input: Array<string>): string {
    return input?.length ? input.join(', ') : 'none...';
  }

  public getBookDownloadCountAsText(count: number): string {
    return `${count} ${count % 10 === 1 ? 'time' : 'times'}`;
  }
}
