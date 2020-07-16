import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/core/api/api.service';
import { SpinnerService } from '@app/shared/services/spinner.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.scss']
})
export class EditOrganizationComponent implements OnInit {
  zeroFormGroup: FormGroup;
  firstFormGroup: FormGroup;

  allOrganizationData: null;
  selectedOrganizationId: Number;
  selectedOrganization: any = {
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
      .getAllOrganizations()
      .subscribe((res: any) => {
        console.log('[DEBUG] eventObtain() in schedule component:');
        console.log(res);
        this.allOrganizationData = res;
        this.selectedOrganization = res[0];
        this.selectedOrganizationId = res[0].id;
        console.log("ThisEventDataBelow:");
        console.log(this.allOrganizationData);

        this.spinnerService.off();
      })

    this.firstFormGroup = this._formBuilder.group({
      eventFullCtrl: [''],
      eventShortCtrl: [''],
    });
  }

  onOrganizationSelected(event: any) {
    console.log('the selected event is:');
    console.log(this.selectedOrganization);

    this.selectedOrganization = event.value;
    this.selectedOrganizationId = event.value.id;

    console.log('the selected event is:');
    console.log(this.selectedOrganization);
  }

  onClickSubmit(stepper) {
    //Edit Organization
    var fullName = this.selectedOrganization.name;
    if (this.firstFormGroup.value.eventFullCtrl != '') {
      fullName = this.firstFormGroup.value.eventFullCtrl;
    }
    var shortName = this.selectedOrganization.info;
    if (this.firstFormGroup.value.eventShortCtrl != '') {
      shortName = this.firstFormGroup.value.eventShortCtrl;
    }

    console.log(`full name: ${fullName}`);
    console.log(`detail info: ${shortName}`);


    this.spinnerService.on();
    this.apiService
      .editOrganization(fullName, shortName, String(this.selectedOrganizationId))
      .subscribe(
        (res: any) => {
          console.log(res);

          this.notificationService.showSuccess('Organization has been created', '')
          this.spinnerService.off();
        },
        (error) => {
          console.log(error);
          this.notificationService.showError('Something went wrong', '');
        })
      .add(
        () => {
          stepper.reset();
          this.spinnerService.off()
        });
  }




  // const dialogRef = this.dialog.open(EditEventDialog, {
  //   data: {
  //     signal: '200',
  //     name: name,
  //     info: info,
  //   }
  // });
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log("something happened.")
  // })
}

//getAllOrganizations()