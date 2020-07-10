import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '@app/core/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from '@app/shared/services/spinner.service';
import { NotificationService } from '@app/shared/services/notification.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss'],
})
export class VisitorComponent implements OnInit {
  currentReq$ = null;

  innerWidth = 0;
  isMobileHeaderHidden = '0';
  previousPageYOffset = 0;
  currentPageYOffset = window.pageYOffset;

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    public spinner: SpinnerService,
    public notifier: NotificationService
  ) { }

  ngOnInit(): void {
    // Set initial inner width
    this.innerWidth = window.innerWidth;
  }

  // Listen for key press
  @HostListener('document:keyup', ['$event'])
  onKeyupHandler(event: KeyboardEvent) {
    const ESC_KEYCODE = 27;

    // Case: ESC character
    if (event.keyCode === ESC_KEYCODE && this.currentReq$ !== null) {
      // Cancel current HTTP request
      this.currentReq$.unsubscribe();
      this.currentReq$ = null;
      this.spinner.off();
      this.notifier.showWarning('Request Cancelled!', '');
      // this.notifier.showSuccess('', '');
      // this.notifier.showError('', '');
      // this.notifier.showInfo('', '');
      console.log('Request cancelled!');
    }
  }

  // Watch for window resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);
  }
}
