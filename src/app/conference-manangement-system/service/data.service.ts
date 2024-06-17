import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, observeOn, throwError } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
 
} from '@angular/common/http';
import { listData } from '../Interface/Idata';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getDataById(editId: string) {
    throw new Error('Method not implemented.');
  }
  saveOrUpdateData(requestBody: Partial<{ name: string | null; department: string | null; date: string | null; timefrom: string | null; timeto: string | null; }>) {
    throw new Error('Method not implemented.');
  }
  dataSubject: any;
  // updateData(value: any): Observable<any> {
  //   return this.http.put<any[]>(`${this.baseUrl}/Conference/` +value.id,value)
  // }
  dataService: any;
  toastr: any;

  // updateUser(user: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/Conference/${user.id}`, user, {
  //     responseType: 'text',
  //   });
  // }
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
  
}
