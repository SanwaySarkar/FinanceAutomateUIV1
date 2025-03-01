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
  isLogin : boolean = false;


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
    this.isLogin = false;
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
      // OAuth2PasswordRequestForm requires form-data encoding.
      if(this.loginForm.valid){
      const formData = {
        'username': this.loginForm.value.username,
        'password': this.loginForm.value.password
      };
      this.isLogin = true;
      this.http.post<any>('http://35.225.6.136:8000/login', formData).subscribe(
        res => {
          this.authService.setToken(res.access_token);
          //this.router.navigate([this.returnUrl]);
          this.router.navigate(['/']);

        },
        err => {
          this.errorMessage = err.error.detail || 'Login failed';
        }
      );
    this.isLogin = false;
  }
  else {
    this.errorMessage = 'Please enter valid credentials';
  }
}
}
