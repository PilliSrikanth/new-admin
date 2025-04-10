import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutstackComponent } from '../components/outstack/outstack.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OutstackComponent
  ],
  imports: [
    CommonModule ,// ✅ Required for *ngFor, *ngIf, etc,
    FormsModule 
  ]
})
export class OutstackModule { }
