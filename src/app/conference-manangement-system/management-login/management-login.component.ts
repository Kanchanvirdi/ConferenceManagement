import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-management-login',
  templateUrl: './management-login.component.html',

  styleUrls: ['./management-login.component.css'],
})
export class ManagementLoginComponent implements OnInit, AfterViewInit {
  listData: any[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'department',
    'date',
    'timefrom',
    'timeto',
    'remove',
  ];
  dataSource = new MatTableDataSource<any>([]);
  userForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  productmessage: undefined | string;
  employeedata = undefined;
  bookings: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      department: ['', Validators.required],
      date: ['', Validators.required],
      timefrom: ['', Validators.required],
      timeto: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchBookings();
    this.dataService.getAll().subscribe((data) => {
      this.dataSource.data = data;
      this.listData = data;
    });

    this.dataService.currentData.subscribe((data: any[]) => {
      this.listData = data;
      this.dataSource.data = this.listData;
    });
  }
 
  fetchBookings(): void {
    this.dataService.getBookings().subscribe(
      (bookings: any) => {
        this.bookings = bookings;
      },
      (error: any) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  save() {
    console.log(this.userForm.value);
    const userForm = {
      id: this.userForm.value.id,
      name: this.userForm.value.name,
      department: this.userForm.value.department,
      date: this.userForm.value.date,
      timefrom: this.userForm.value.timefrom,
      timeto: this.userForm.value.timeto,
    };
  }

  removeItem(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listData = this.listData.filter((item) => item !== element);
        this.dataService.deleteUser(element.id).subscribe(
          (response) => {
            console.log('User deleted successfully', response);
            this.dataSource.data = this.listData;
          },
          (error) => {
            console.error('Error deleting user', error);
          }
        );
      } else {
        console.log('Deletion canceled');
      }
    });
  }

  getControl(name: string): AbstractControl | null {
    return this.userForm.get(name);
  }
  BookCon() {
    this.router.navigate(['/department']);
  }

  editItem(element: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        element: element,
      },
    };
    this.router.navigate(['/department'], navigationExtras);
  }

  edit(data: any) {
    let conid = this.route.snapshot.paramMap.get('id');
    console.warn(conid);

    const index = this.listData.findIndex((item) => item.id === data.id);

    if (index !== -1) {
      this.listData[index] = data;

      this.dataSource.data = this.listData;

      this.dataService.update(data).subscribe(
        (result: any) => {
          if (result) {
            this.productmessage = 'User has been updated';
            this.router.navigate(['/department']);
          }
        },
        (error: any) => {
          console.error(error);
          this.productmessage = 'User could not be updated';
        }
      );
    } else {
      console.error('Item not found in listData array');
    }
  }
}
