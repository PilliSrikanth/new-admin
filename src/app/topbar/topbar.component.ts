import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent  implements OnInit {
  vendorName: string = '';
  vendorImage: string = 'http://localhost:3002/vender/vender-details'; // fallback image
  vendorId:string ='';

  constructor(private vendorService: UserService) {}

  ngOnInit(): void {
    const vendorId = localStorage.getItem('venderId');
    console.log('new vender id', vendorId)
    if (vendorId) {
      this.vendorService.getVendorDetails(vendorId).subscribe({
        next: (res) => {
          const vender = res.vender;
          this.vendorName = vender.fullName || vender.userName;
          this.vendorImage = vender.profileImage
            ? `http://localhost:3002${vender.profileImage}`
            : this.vendorImage;
        },
        error: (err) => {
          console.error('Error fetching vendor data:', err);
        },
      });
    } else {
      console.warn('Vendor ID not found in localStorage');
    }
  }
}