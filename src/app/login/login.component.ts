import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  loginError: string | null = null;
  dialogRef: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
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

    const { email, password } = this.loginForm.value;
    this.apiService.login(email, password).subscribe(
      response => {
        console.log('Login successful', response);
        const email = response.userId;
        const restarentId = response.resrentId
        // Store only userId in local storage
        localStorage.setItem('email', email);
        localStorage.setItem('restarentId', restarentId); 
        console.log(restarentId)
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed', error);
        this.loginError = 'Login failed. Please check your credentials.';
      }
    );
  }
  onClose() {
    this.dialogRef.close();
  }
}
