import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routes } from './app.routes'; 
import { RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { DashboardV1Component } from './dashboardv1/dashboardv1.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    // AppComponent,
    // LandingPageComponent,DashboardComponent,DashboardV1Component,
    // LoginComponent,SignupComponent // Declare the LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  //bootstrap: [AppComponent]
})
export class AppModule {}