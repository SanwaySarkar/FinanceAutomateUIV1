import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { log } from 'console';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  returnUrl: string = '/dashboard';
  errorMessage: string = '';
  emailId: string = '';
  pwd: string = '';
  loginForm: FormGroup;
  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  redirectToHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.isLoading = true;
      const formData = {
        'username': this.loginForm.value.username,
        'password': this.loginForm.value.password
      };
      this.http.post<any>('https://3finityai.com/api/login', formData).subscribe(
        res => {
          this.isLoading = false;
          this.authService.setToken(res.access_token);
          this.errorMessage = '<span style="color: #22c55e">Login successful! Redirecting to home page...</span>';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        err => {
          this.isLoading = false;
          this.errorMessage = err.error.detail || 'Login failed';
        }
      );
    } else {
      this.errorMessage = 'Please enter valid credentials';
    }
  }
}

