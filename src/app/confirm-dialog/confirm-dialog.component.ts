import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
  dataSource = new MatTableDataSource<any>([]);
  listData: any[] = [];

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
   
  
    this.dialogRef.close(true);
    this.dataSource.data = this.listData  
    
  }
    
  
}
