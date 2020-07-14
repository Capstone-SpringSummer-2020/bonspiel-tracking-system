import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/core/api/api.service';
import { SpinnerService } from '@app/shared/services/spinner.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-bracket',
  templateUrl: './create-bracket.component.html',
  styleUrls: ['./create-bracket.component.scss']
})
export class CreateBracketComponent implements OnInit {
  zeroFormGroup: FormGroup;
  firstFormGroup: FormGroup;

  allEventData: null;
  selectedEventId: Number;
  selectedEvent: any = {
    shortName: 'shortname',
    fullName: 'fullname',
  }

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.spinnerService.on();
    this.apiService
      .getEvents()
      .subscribe((res: any) => {
        console.log('[DEBUG] eventObtain() in schedule component:');
        console.log(res);
        this.allEventData = res;
        this.selectedEvent = res[0];
        console.log("ThisEventDataBelow:");
        console.log(this.allEventData);

        this.spinnerService.off();
      })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [''],
    });

  }

  onEventSelected(event: any) {
    console.log(this.allEventData);
    console.log('the selected event is:');
    console.log(this.selectedEvent);

    this.selectedEventId = event.value.id;
  }

  onCreateBracket() {
    const bracketName = this.firstFormGroup.value.firstCtrl;
    console.log(`full name:`);
    console.log(this.selectedEventId)
    this.spinnerService.on();

    this.apiService
      .createBracket(bracketName, String(this.selectedEvent.id))
      .subscribe((res: any) => {
        this.notificationService.showSuccess('Bracket has been created', '')

        this.apiService.getBracket(this.selectedEventId).subscribe((res: any) => {
          console.log(res)
        })

        this.spinnerService.off();
      },
        (error) => {
          console.log(error);
          this.notificationService.showError('Something went wrong when adding Bracket', '');
        })
  }
}
