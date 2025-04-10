import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employeesCount: number = 0;
  inStockCount: number = 0;
  salesCount: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe(
      (data) => {
        this.employeesCount = data.employees;
        this.inStockCount = data.inStock;
        this.salesCount = data.sales;
      },
      (error) => {
        console.error('Error fetching dashboard data', error);
      }
    );
  }
}
