import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3002';
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; venderId: string, restarentId:string }>(`${this.baseUrl}/vender/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);  // Store token
          console.log('Stored token:', response.token);
        }
      })
    );
  }
 

  register(userName:string, email: string, password: string,): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/vender/register`, { userName, email, password });
  }

  submitItem(formData: FormData): Observable<any> {
    const logintoken = localStorage.getItem('token'); // Retrieve token from localStorage
  
    if (!logintoken) {
      console.error('Token not found!');
      return throwError(() => new Error('Token not found!')); // Proper error handling
    }
  
    // Correctly setting headers
    const headers = new HttpHeaders({
      'token': logintoken
    });
  
    return this.http.post<{token: string; venderId: string, restarentId:string  }>(`${this.baseUrl}/restarent/registerRestarent`, formData, { headers }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);  // Store token
          localStorage.setItem('venderId', response.venderId); // Store vender ID
          localStorage.setItem('restarentId', response.restarentId); // Store vender ID
          
          console.log('Stored token:', response.token);
          console.log('Stored Vender ID:', response.venderId);
          console.log('Stored restarent ID:', response.restarentId);
        }
      })
    );
  }


  addProduct(formData: FormData): Observable<any> {
    const logintoken = localStorage.getItem('token');
    const restarentId = localStorage.getItem('restarentId'); // ✅ Correctly retrieve restaurant ID

    if (!logintoken || !restarentId) {
      console.error('Token or Restaurant ID not found!');
      return throwError(() => new Error('Authentication error!'));
    }

    const headers = new HttpHeaders({
      'token': logintoken
    });

    // ✅ Corrected API URL
    const apiUrl = `${this.baseUrl}/products/addProduct/${restarentId}/add-product`;

    return this.http.post<any>(apiUrl, formData, { headers }).pipe(
      catchError(error => {
        console.error('❌ Error adding product:', error);
        return throwError(() => new Error('Failed to add product!'));
      })
    );
}

  
  
}
