import { Component, OnInit } from '@angular/core';
import { AddProductService } from 'src/app/add-product.service';
import { InStockService } from 'src/app/in-stock-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  stocks: any[] = [];
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
    });
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
