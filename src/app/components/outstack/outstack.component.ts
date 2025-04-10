import { Component, OnInit } from '@angular/core';
import { OutstockService } from 'src/app/outstock.service';
import { OutstackModule } from 'src/app/outstock/outstock.module';

@Component({
  selector: 'app-outstack',
  templateUrl: './outstack.component.html',
  styleUrls: ['./outstack.component.css']
})
export class OutstackComponent implements OnInit {
  outStockList: any[] = [];
  filteredOutStockList: any[] = [];
  searchTerm: string = '';

  constructor(private outStockService: OutstockService) {}

  ngOnInit(): void {
    this.loadOutStockData();
  }

  loadOutStockData(): void {
    this.outStockService.getOutStockList().subscribe(
      (data) => {
        this.outStockList = data;
        this.filterOutStocks(); // Apply filter initially
      },
      (error) => {
        console.error('Error fetching out stock data', error);
      }
    );
  }

  filterOutStocks(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredOutStockList = this.outStockList.filter((item: any) => {
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

  getTotalQuantity(item: any): number {
    return item.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
  }

  getTotalPrice(item: any): number {
    return item.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  }
}