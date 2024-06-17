import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../conference-manangement-system/service/data.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit, AfterViewInit {
  listData: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'mobile', 'email', 'password'];
  dataSource = new MatTableDataSource<any>([]);
  userForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  productmessage: undefined | string;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
 
  ) {
    this.userForm = this.fb.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.dataService.getalll().subscribe((data: any) => {
      this.dataSource.data = data;
      this.listData = data;
    });

    this.dataService.currentData.subscribe((data: any[]) => {
      this.listData = data;
      this.dataSource.data = this.listData;
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  save() {
    const userForm = {
      id: this.userForm.value.id,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      mobile: this.userForm.value.mobile,
      password: this.userForm.value.password,
    };
    // Add save logic here, for example:
    // this.dataService.saveUser(userForm).subscribe();
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
        element: element
      }
    };
   
  }

  edit(data: any) {
    let conid = this.route.snapshot.paramMap.get("id");

    const index = this.listData.findIndex((item: { id: any; }) => item.id === data.id);

    if (index !== -1) {
      this.listData[index] = data;
      this.dataSource.data = this.listData;

      this.dataService.update(data).subscribe(
        (result: any) => {
          if (result) {
            this.productmessage = "User has been updated";
          }
        },
        (error: any) => {
          console.error(error);
          this.productmessage = "User could not be updated";
        }
      );
    } else {
      console.error("Item not found in listData array");
    }
  }
  openLogoutConfirmation(): void {
    const dialogRef = this.dialog.open(LogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  logout(): void {
    this.router.navigate(['admin']);
  }
}
