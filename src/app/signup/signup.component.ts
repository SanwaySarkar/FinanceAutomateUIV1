import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  redirectToHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const formData = {
        'username': this.signupForm.value.username,
        'email': this.signupForm.value.email,
        'password': this.signupForm.value.password
      };
      this.http.post<any>('http://localhost:8000/signup', formData).subscribe(
        res => {
          this.isLoading = false;
          this.errorMessage = '<span style="color: #22c55e">Signup successful! Redirecting to home page...</span>';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        err => {
          this.isLoading = false;
          this.errorMessage = err.error.detail || 'Signup failed';
        }
      );
    } else {
      this.errorMessage = 'Please fill all required fields correctly';
    }
  }
}
