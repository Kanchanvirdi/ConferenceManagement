import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentLoginComponent } from './conference-manangement-system/department-login/department-login.component';
import { ManagementLoginComponent } from './conference-manangement-system/management-login/management-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './conference-manangement-system/nav/nav.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { WildCardComponent } from './conference-manangement-system/wild-card/wild-card.component';
import { FooterComponent } from './conference-manangement-system/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ConComponent } from './ConferenceManagementSystem/con/con.component';
import { MatIconModule } from '@angular/material/icon';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';



import { MatButtonModule } from '@angular/material/button';
import { LogoutboxComponent } from './registrationList/logoutbox/logoutbox.component';
import { LogoutComponent } from './registration-list/logout/logout.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
 
 





@NgModule({
  declarations: [
    AppComponent,
    DepartmentLoginComponent,
    ManagementLoginComponent,
    NavComponent,
    WildCardComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    ConComponent,
    ConfirmDialogComponent,
    AdminComponent,
    RegistrationListComponent,
    ConfirmationDialogComponent,
    LogoutboxComponent,
    LogoutComponent,
    AboutComponent,
    ContactComponent,
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatPaginatorModule,
    MatButtonModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 10000, // 10 seconds
      progressBar: true,
    }),
    MatIconModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
