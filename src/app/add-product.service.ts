import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  private apiUrl = 'http://103.164.70.170:3002/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
}
