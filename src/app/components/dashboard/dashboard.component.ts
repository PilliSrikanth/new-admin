import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';
import { EmployeeService } from 'src/app/employee.service';
import { InStockService } from 'src/app/in-stock-service.service';
import { OutstockService } from 'src/app/outstock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  filteredStocks: any[] = [];
  stocks: any[] = [];
  employees: any[] = [];
  searchTerm: string = '';
  employeesCount: number = 0;
  inStockCount: number = 0;
  salesCount: number = 0;
  activeView: string = 'dashboard'; // default

  setView(view: string): void {
    this.activeView = view;
    this.filterByView();
  }
  

  constructor(
    private dashboardService: DashboardService,
    private stockService: InStockService,
    private outStockService: OutstockService,
    private employeeService: EmployeeService
    
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.getStockList();
    this.loadOutStockData();
    this.fetchEmployees();
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
 

  getStockList(): void {
    this.stockService.getStocks().subscribe((data: any) => {
      this.stocks = data.map((stock: any) => ({
        ...stock,
        addQuantity: 0,
        addPrice: 0
      }));
      this.filteredStocks = [...this.stocks]; // initialize filtered data
    });
  }

  filterByView(): void {
    switch (this.activeView) {
      case 'employees':
        this.filterEmployees();
        break;
      case 'instock':
        this.filterStocks();
        break;
      case 'sales':
        this.filterOutStocks();
        break;
      default:
        this.filteredStocks = []; // or show nothing
    }
  }
  

  filterStocks(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredStocks = this.stocks.filter(stock =>
      stock.name.toLowerCase().includes(term) ||
      stock.barcode.toString().includes(term)
    );
  }
  loadOutStockData(): void {
    this.outStockService.getOutStockList().subscribe(
      (data) => {
        this.filteredStocks = data;
        this.filterOutStocks(); // Apply filter initially
      },
      (error) => {
        console.error('Error fetching out stock data', error);
      }
    );
  }

  filterOutStocks(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredStocks = this.filteredStocks.filter((item: any) => {
      const orderIdMatch = item._id?.toLowerCase().includes(term);
      const employeeMatch = item.userId?.toLowerCase().includes(term);
      const paymentMatch = item.paymentMethod?.toLowerCase().includes(term);

      const itemNameMatch = item.items?.some((i: any) =>
        i.name?.toLowerCase().includes(term)
      );
      const barcodeMatch = item.items?.some((i: any) =>
        i.barcode?.toString().includes(term)
      );

      return orderIdMatch || employeeMatch || paymentMatch || itemNameMatch || barcodeMatch;
    });
  }
  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this. filteredStocks = data; // initialize filtered list
      },
      error: (err) => console.error('Error fetching employees', err)
    });
  }

  filterEmployees(): void {
    const term = this.searchTerm.toLowerCase();

    this. filteredStocks = this.employees.filter(emp =>
      emp._id?.toLowerCase().includes(term) ||
      emp.name?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.phone?.toString().includes(term) ||
      emp.status?.toLowerCase().includes(term)
    );
  }
}
