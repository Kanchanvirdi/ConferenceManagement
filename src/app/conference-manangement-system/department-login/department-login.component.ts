

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

interface Booking {
  name: string;
  department: string;
  date: string;
  timefrom: string;
  timeto: string;
}

@Component({
  selector: 'app-department-login',
  templateUrl: './department-login.component.html',
  styleUrls: ['./department-login.component.css']
})
export class DepartmentLoginComponent implements OnInit {
  userForm!: FormGroup;
  nRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
  isEditMode: boolean = false;
  bookings: Booking[] = [];
  timeSlotForm!: FormGroup;
  availabilityMessage: string = 'yes';
  userList: any[] = [];

  constructor(
    private service: DataService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(this.nRegex)
      ]),
      department: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required, this.pastDateValidator]),
      timefrom: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
      ]),
      timeto: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
      ])
    });

    const element = history.state.element;
    if (element) {
      this.getItem(element);
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
      this.userForm.reset();
    }
  }

  pastDateValidator(control: FormControl): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (inputDate < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  getItem(element: any) {
    this.userForm.patchValue({
      name: element.name,
      department: element.department,
      date: element.date,
      timefrom: element.timefrom,
      timeto: element.timeto
    });
  }

  getControl(name: string): AbstractControl | null {
    return this.userForm.get(name);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.userForm.reset();
    }
  }

  onSubmit(): void { debugger
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.service.addData(userData).subscribe({
        next: (response) => {
          this.toastr.success('Data is added successfully.');
          this.router.navigate(['/management']);
        },
        error: (error) => {
          if (error.status === 409) { // Conflict
            this.toastr.error('The time slot is already booked.');
          } else {
            this.toastr.success('Succesfully added the data');
            this.router.navigate(['/management']);
          }
        }
      });
    } else {
      if (this.getControl('date')?.errors?.['pastDate']) {
        this.toastr.error('The selected date is in the past.');
      }
    }
  }
}
