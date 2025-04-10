import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProductsComponent } from './components/products/products.component';
import { InstackComponent } from './components/instack/instack.component';
import { OutstackComponent } from './components/outstack/outstack.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RLComponent } from './r-l/r-l.component';

const routes: Routes = [
  {path:'',component:RLComponent},
  {path:"register", component:RegisterComponent},
  {path:"login",component:LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'employee', component: EmployeesComponent },
  {path:'instack', component:InstackComponent},
  {path:'outsatck',component:OutstackComponent},
  {path:'addproduct',component:AddProductComponent},
  {path:'home',component:HomeComponent},
  {path:'sidebar',component:SidebarComponent},
  {path:'topbar',component:TopbarComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
