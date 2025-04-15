import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  selectedImage: File | null = null;

  constructor(
    private stockService: InStockService,
    private snackBar: MatSnackBar
  ) {}

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

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  addStock(): void {
    const formData = new FormData();
    formData.append('name', this.newStock.name);
    formData.append('barcode', this.newStock.barcode.toString());
    formData.append('price', this.newStock.price.toString());
    formData.append('quantity', this.newStock.quantity.toString());
    formData.append('totalQuantity', this.newStock.totalQuantity.toString());
  
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
  
    this.stockService.addStock(formData).subscribe(() => {
      // ✅ Show success message
      this.snackBar.open('Stock added successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
  
      // ✅ Reset form
      this.newStock = {
        name: '',
        barcode: '',
        price: '',
        quantity: 0,
        totalQuantity: 100
      };
      this.selectedImage = null;
  
      // ✅ Refresh stock list
      this.getStockList();
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
