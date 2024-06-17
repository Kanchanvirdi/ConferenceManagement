import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegistartionService } from './registartion.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registration!: FormGroup;
  
  service: any;

  constructor(
    private fb: FormBuilder,

    private registartionService: RegistartionService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registration = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  onSubmit(): void {
    console.log(this.registration.value);
    if (this.registration.invalid) {
      this.toastr.error('Please fill all required fields.');
      return;
    } else {
      this.toastr.success('Data saved successfully!');
    }
    const requestBody = {
      name: this.registration.value.name,
      mobile: this.registration.value.mobile,
      email: this.registration.value.email,
      password: this.registration.value.password,
    };
    this.service.addData(requestBody).subscribe(
      (response: any) => {
        this.toastr.success('Data saved successfully!');
        console.warn('POST service data', response);
        this.router.navigate(['/login']);
      },

      (status: any) => {
        if (status.status === 200) {
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
  requestBody(requestBody: any) {
    throw new Error('Method not implemented.');
  }

  getControl(name: string): AbstractControl | null {
    return this.registration.get(name);
  }
  OnRegister(): void {
    const registartionData = this.registration.value;
    this.registartionService
      .registration(registartionData)
      .subscribe((data) => {
       
      },
      (error) => {
        console.error('Registration failed', error);
      }
       
      );
      this.router.navigate(['/login']);
  }
 
  loginHere(event: Event){
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
