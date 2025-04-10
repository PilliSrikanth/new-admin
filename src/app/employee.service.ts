import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3002/employee';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee`, {
      headers: this.getAuthHeaders()
    });
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/status`, { status }, {
      headers: this.getAuthHeaders()
    });
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}