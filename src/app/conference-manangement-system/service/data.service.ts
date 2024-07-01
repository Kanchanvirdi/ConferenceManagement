import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, observeOn, throwError } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
 
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  addUser(value: any) {
    throw new Error('Method not implemented.');
  }
 
  getDataById(editId: string) {
    throw new Error('Method not implemented.');
  }
  saveOrUpdateData(requestBody: Partial<{ name: string | null; department: string | null; date: string | null; timefrom: string | null; timeto: string | null; }>) {
    throw new Error('Method not implemented.');
  }
  dataSubject: any;
  dataService: any;
  toastr: any;


  currentData: any;
  apiCall(Department: string) {
    throw new Error('Method not implemented.');
  }
  baseUrl = 'https://localhost:7192/api';
  constructor(private http: HttpClient) {}
  

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Conference/GetAll`);
  }
  getalll( ){
    return this.http.get(`${this.baseUrl}/Registartion/getall`);
  }
  

  addData(data: any): Observable<any> {
    const requestBody = {
      name: data.name,
      department: data.department,
      date: data.date,
      timefrom: data.timefrom,
      timeto: data.timeto,
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/Conference`, requestBody, {});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Conference/${id}`, {
      responseType:  undefined,
    });
  }
  update(employee:any) :Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/Conference/` +employee.id,employee)

  }
  
  saveBooking(booking: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Conference`, booking).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Conference/GetAll`).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }
 
}

