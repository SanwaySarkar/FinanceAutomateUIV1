import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import e from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,RouterModule,CommonModule],
  standalone: true,
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';
  isSignup : boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.isSignup = false;
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = {
        'username': this.signupForm.value.username,
        'password': this.signupForm.value.password,
        'email': this.signupForm.value.email
      };
      this.isSignup = true;
      this.http.post<any>('http://localhost:8000/signup', formData).subscribe(
        res => {
          this.router.navigate(['/']);
        },
        err => {
          this.errorMessage = err.error.detail || 'Signup failed';
        }
      );
      this.isSignup = false;
    }
  }
}
