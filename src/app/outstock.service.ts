import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutstockService {

  private apiUrl = 'http://localhost:3002/outstock/api/outstock'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

// Get all out stock records
getOutStockList(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

// Add a new record
addOutStock(data: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, data);
}

// Update a record
updateOutStock(id: string, data: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, data);
}

// Delete a record
deleteOutStock(id: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}
}
