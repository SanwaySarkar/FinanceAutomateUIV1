import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';



export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  //{ path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  //{ path: 'signup', component: SignupComponent },
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/dashboard' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

