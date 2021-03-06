import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from '@app/core/api/api.service';
import { CookieService } from 'ngx-cookie-service';

import { VisitorModule } from '@app/modules/visitor/visitor.module';
import { AdminModule } from '@app/modules/admin/admin.module';
import { SharedModule } from '@app/shared/shared.module';

import { HeaderComponent } from '@app/layout/header/header.component';
import { FooterComponent } from '@app/layout/footer/footer.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { ToastrModule } from 'ngx-toastr';
import { ScheduleComponent } from './modules/visitor/components/schedule/schedule.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatListModule } from '@angular/material/list';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './core/_helpers';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './core/router-strategy';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    VisitorModule,
    AdminModule,
    SharedModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatListModule,
    NgxGraphModule,
    MatTreeModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    ApiService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }

    // provider used to create fake backend
    // fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
