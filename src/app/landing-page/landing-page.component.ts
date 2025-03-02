import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  message: string = '';
  isLoggedIn: boolean = false;
  userName: string = ''; // Example user name
  dropdownOpen: boolean = false;
  constructor(private router: Router,private http:HttpClient,private authService : AuthService) {
    this.isLoggedIn = false;
  }
  ngOnInit(): void {
    if(typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
    
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      });    
      this.http.get<any>('http://35.223.216.83:8000/protected', { headers }).subscribe(
        res => {
          this.isLoggedIn = true;
          this.userName = res.message;
        },
        err => {
          console.log(err);
          this.isLoggedIn = false;
          this.logout();
        }
      );
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  redirectToSignUp() {
    this.router.navigate(['/signup']);
  }
}
