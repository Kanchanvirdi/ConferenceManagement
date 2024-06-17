import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  
  loginSer: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {debugger
    if (this.userForm.valid) {
      const isValid = this.loginService.login(this.userForm.value);
      if (isValid) {
        console.log('Login successful');
      } else {
        console.log('Invalid email or password');
      }
    }

    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      this.toastr.error('Please fill in all required field.');
      return;
    } else {
      // this.toastr.success('Data saved successfully!');
    }

    const requestBody = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };
    this.loginService.addData(requestBody).subscribe(
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
  

    this.loginService.addData(requestBody).subscribe(
      (response: any) => {
        console.warn('POST service data', response);
      },
      (error: any) => {
        console.error('Failed to call POST API:', error);
      }
    );
  }

  getControl(email: string): AbstractControl | null {
    return this.userForm.get(email);
  }

  
  requestBody(requestBody: any) {
    throw new Error('Method not implemented.');
  }
  OnLogin(): void {debugger
    const loginData = this.userForm.value;
    this.loginService.login(loginData).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.loginSer = response.body;
          console.log(this.loginSer);
          this.toastr.success('Login successful!', 'Success');
          this.router.navigate(['/management']);
        } else {
          console.error(`Login failed with status: ${response.status}`);
          this.toastr.success('Login successful!', 'Success');
        }
      },
      (error) => {
        console.error('Login request failed', error);
        this.toastr.error('Incorrect Email and Password', 'Error');
      }
    );
  }
  clickHere(event: Event) {
    event.preventDefault();
    this.router.navigate(['/registration']);
  }
}
