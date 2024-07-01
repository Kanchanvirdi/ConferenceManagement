import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';
import { AdminServiceService } from './admin-service.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  admin!: FormGroup;
  service: any;
  loginSer: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router,
    private adminService:AdminServiceService
  ) {}

  ngOnInit(): void {
    this.admin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
 

  onSubmit(): void {
    if (this.admin.valid) {
      const isValid = this.loginService.login(this.admin.value);
      if (isValid) {
        console.log('Admin Login successful');
      } else {
        console.log('Invalid email or password');
      }
    }

    console.log(this.admin.value);
    if (this.admin.invalid) {
      this.toastr.error('Please fill in all required field.');
      return;
    } else {
      // this.toastr.success('Data saved successfully!');
    }

    const requestBody = {
      email: this.admin.value.email,
      password: this.admin.value.password,
    };
    this.service.addData(requestBody).subscribe(
      (response: any) => {
        this.toastr.success('Data saved successfully!');
        console.warn('POST service data', response);
      },
      (status: any) => {
        if (status.status == 200) {
          this.toastr.success('Data saved successfully!');
        } else {
          this.toastr.error('Failed to save data. Please try again.');
        }
      }
    );

    this.service.addData(requestBody).subscribe(
      (response: any) => {
        console.warn('POST service data', response);
      },
      (error: any) => {
        console.error('Failed to call POST API:', error);
      }
    );
  }

  getControl(email: string): AbstractControl | null {
    return this.admin.get(email);
  }

  
  requestBody(requestBody: any) {
    throw new Error('Method not implemente.');
  }
  OnLogin(): void {
    const adminData = this.admin.value;
    this.adminService.alogin(adminData).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.loginSer = response.body;
          console.log(this.loginSer);
          this.toastr.success('Admin Login successful!', 'Success');
          this.router.navigate(['/registrationlist']);
        } else {
          console.error(`Admin Login failed with status: ${response.status}`);
          this.toastr.success('Admin Login successful!', 'Success');
        }
      },
      (error: any) => {
        console.error('Admin Login request failed', error);
        this.toastr.error('Incorrect Email and Password', 'Error');
      }
    );
  }
  clickHere(event: Event) {
    event.preventDefault();
    this.router.navigate(['/registrationlist']);
  }
}
