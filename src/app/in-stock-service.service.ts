import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InStockService {
  private apiUrl = 'https://new-supermarket-backend-new.onrender.com/stock/stocks'; // Replace with your actual API endpoint
  private baseUrl = 'https://new-supermarket-backend-new.onrender.com/api/products';

  constructor(private http: HttpClient) {}

 // Get all stock items
 getStocks(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/all-products`);
}

// Add a new stock item
addStock(stockData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/scan`, stockData);
}

// Update stock item
updateStock(id: string, stockData: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, stockData);
}

// Delete stock item
deleteStock(id: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}
}
