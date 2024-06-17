import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  addData(requestBody: { email: any; password: any; }):Observable<any> {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'https://localhost:7192/api/';

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<HttpResponse<any>> {
    const requestBody = {
      email: loginData.email,
      password: loginData.password,
    };
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}Login/ConfrenceUser`, requestBody, {observe:'response'});
  }
}
