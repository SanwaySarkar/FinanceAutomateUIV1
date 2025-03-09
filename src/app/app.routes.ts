import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Landingv1Component } from './landingv1/landingv1.component';
import { DashboardV1Component } from './dashboardv1/dashboardv1.component'; // Correct the import name



export const routes: Routes = [
  //{ path: '', component: LandingPageComponent},
  { path: '', component: Landingv1Component },
  { path: 'dashboard', component: DashboardV1Component ,canActivate: [AuthGuard] },
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/dashboard' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

