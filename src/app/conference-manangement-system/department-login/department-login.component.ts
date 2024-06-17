import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-login',
  templateUrl: './department-login.component.html',
  styleUrls: ['./department-login.component.css']
})
export class DepartmentLoginComponent implements OnInit {
  userForm!: FormGroup;
  nRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
  isEditMode: boolean = false; // Flag to control edit modeformgr
  formgoup:FormGroup | undefined



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
      date: new FormControl('', [Validators.required]),
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

  OnSubmit() {
    if (this.userForm.invalid) {
      this.toastr.error('Please fill in all required fields correctly.');
      return;
    }

    const requestBody = {
      name: this.userForm.value.name,
      department: this.userForm.value.department,
      date: this.userForm.value.date,
      timefrom: this.userForm.value.timefrom,
      timeto: this.userForm.value.timeto
    };

    this.service.addData(requestBody).subscribe(
      (response: any) => {
        this.toastr.success('Data saved successfully!');
        console.warn('POST service data', response);
        this.router.navigate(['/management']);
      },
      (error: any) => {
        if (error.status === 200) {
          this.toastr.success('Data saved successfully!');
          this.router.navigate(['/management']);
        } else {
          this.toastr.error('Failed to save data. Please try again.');
        }
      }
    );
  }
}
