import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data; // initialize filtered list
      },
      error: (err) => console.error('Error fetching employees', err)
    });
  }

  filterEmployees(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredEmployees = this.employees.filter(emp =>
      emp._id?.toLowerCase().includes(term) ||
      emp.name?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.phone?.toString().includes(term) ||
      emp.status?.toLowerCase().includes(term)
    );
  }

  acceptEmployee(id: string): void {
    this.employeeService.updateStatus(id, 'accepted').subscribe({
      next: () => this.fetchEmployees(),
      error: (err) => console.error('Error accepting employee', err)
    });
  }

  rejectEmployee(id: string): void {
    this.employeeService.updateStatus(id, 'rejected').subscribe({
      next: () => this.fetchEmployees(),
      error: (err) => console.error('Error rejecting employee', err)
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.fetchEmployees(),
        error: (err) => console.error('Error deleting employee', err)
      });
    }
  }
}
