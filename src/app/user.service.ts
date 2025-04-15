import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://new-supermarket-backend-new.onrender.com/vender';

  constructor(private http: HttpClient) {}

  getVendorDetails(vendorId: string) {
    return this.http.get<any>(`${this.apiUrl}/vender-details/${vendorId}`);
  }
}
