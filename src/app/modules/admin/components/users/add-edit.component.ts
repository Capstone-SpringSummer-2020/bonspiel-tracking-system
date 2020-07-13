﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@core/_services';
import { NotificationService } from '@app/shared/services/notification.service';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', passwordValidators],
      isSuperAdmin: [false, Validators.required],
    });

    // if (!this.isAddMode) {
    //   this.accountService.getById(this.id)
    //     .pipe(first())
    //     .subscribe(x => {
    //       this.f.firstName.setValue(x.firstName);
    //       this.f.lastName.setValue(x.lastName);
    //       this.f.username.setValue(x.username);
    //     });
    // }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    const username = this.form.value.username;
    const password = this.form.value.password;
    const isSuperAdmin = String(this.form.value.isSuperAdmin);
    this.accountService.createAdmin(username, password, isSuperAdmin)
      .subscribe(
        data => {
          this.notificationService.showSuccess('User added successfully', '');
          this.router.navigate(['/admin/users']);
        },
        error => {
          this.notificationService.showError('Something went wrong', '');
          this.loading = false;
        });
  }

  private updateUser() {
    this.accountService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['/admin/users']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}