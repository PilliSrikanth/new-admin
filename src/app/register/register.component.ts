import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup | any;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const {userName, email, password } = this.loginForm.value;
    this.apiService.register(userName, email, password).subscribe(
      response => {
        console.log('Login successful', response);
        const email = response.userId;
        // Store only userId in local storage
        localStorage.setItem('email', email);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Login failed', error);
        this.loginError = 'Login failed. Please check your credentials.';
      }
    );
  }
}
