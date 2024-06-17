import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistartionService {
  private baseUrl = 'https://localhost:7192/api/';


  constructor(private http: HttpClient) { }

  registration(registartionData: any): Observable<HttpResponse<any>> {
    const requestBody = {
    name:registartionData.name,
    mobile:registartionData.mobile,
      email: registartionData.email,
      password: registartionData.password,
    };
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}Registartion/AddUser`,requestBody, {observe:'response'});
  }
   

}
