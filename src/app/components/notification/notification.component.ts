import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { QueryStatus } from 'src/app/state/books/books.state';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnDestroy {

  private errorNotificationTimeoutId: number | undefined;
  public showNotification: boolean = false;
  public notificationText: string = '';

  @Input('status')
  status: QueryStatus | undefined;

  ngOnChanges(): void {
    this.statusHandler();
  }

  ngOnDestroy(): void {
    this.clearComponentState();
  }

  private statusHandler(): void {
    switch(this.status) {
      case 'error':
        this.onErrorState();
        break;
      case 'loading':
        this.onLoadingState();
        break;
      case 'ready':
      default:
        this.clearComponentState();
        break;
    }
  }

  private onLoadingState(): void {
    this.showNotification = true;
    this.notificationText = 'Loading. Please, wait...';
  }

  private onErrorState(): void {
    this.notificationText = 'Error occured during last request. Try again';
    this.showNotification = true;
    this.errorNotificationTimeoutId = window.setTimeout(this.clearComponentState.bind(this), 2000);
  }

  private clearComponentState(): void {
    this.showNotification = false;
    this.notificationText = '';
    this.clearErrorNotificationTimeout();
  }

  private clearErrorNotificationTimeout(): void {
    if (!this.errorNotificationTimeoutId) {
      return;
    }
    clearTimeout(this.errorNotificationTimeoutId);
    this.errorNotificationTimeoutId = undefined;
  }

}
