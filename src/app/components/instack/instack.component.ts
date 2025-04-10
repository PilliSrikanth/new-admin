import { Component, OnInit } from '@angular/core';
import { InStockService } from 'src/app/in-stock-service.service';

@Component({
  selector: 'app-instack',
  templateUrl: './instack.component.html',
  styleUrls: ['./instack.component.css']
})
export class InstackComponent implements OnInit {
  stocks: any[] = [];
  filteredStocks: any[] = [];
  searchTerm: string = '';

  newStock = {
    name: '',
    barcode: '',
    price: '',
    quantity: 0,
    totalQuantity: 100
  };

  constructor(private stockService: InStockService) {}

  ngOnInit(): void {
    this.getStockList();
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

  filterStocks(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredStocks = this.stocks.filter(stock =>
      stock.name.toLowerCase().includes(term) ||
      stock.barcode.toString().includes(term)
    );
  }

  addStock(): void {
    this.stockService.addStock(this.newStock).subscribe(() => {
      this.getStockList();
      this.newStock = {
        name: '',
        barcode: '',
        price: '',
        quantity: 0,
        totalQuantity: 100
      };
    });
  }

  addQuantity(stock: any): void {
    const addedQty = Number(stock.addQuantity);
    if (!addedQty || addedQty <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    const updatedQuantity = stock.quantity + addedQty;
    const updatedTotalQuantity = stock.totalQuantity + addedQty;

    this.stockService.updateStock(stock._id, {
      quantity: updatedQuantity,
      totalQuantity: updatedTotalQuantity
    }).subscribe(() => this.getStockList());
  }

  addPrice(stock: any): void {
    const addedPrice = Number(stock.addPrice);
    if (isNaN(addedPrice)) {
      alert('Please enter a valid price.');
      return;
    }

    const updatedPrice = Number(stock.price) + addedPrice;

    this.stockService.updateStock(stock._id, {
      price: updatedPrice
    }).subscribe(() => this.getStockList());
  }

  deleteStock(id: string): void {
    this.stockService.deleteStock(id).subscribe(() => {
      this.getStockList();
    });
  }
}
