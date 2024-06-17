import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private baseUrl = 'https://localhost:7192/api/';

  constructor(private http: HttpClient) {}

  alogin(adminData: any): Observable<HttpResponse<any>> {
    const requestBody = {
      email: adminData.email,
      password: adminData.password,
    };
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}Admin/Admin`, requestBody, {observe:'response'});
  }

}
