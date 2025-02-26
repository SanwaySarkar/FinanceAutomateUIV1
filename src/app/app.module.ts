import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './app.routes'; 
import { RouterModule } from '@angular/router'; 
import { LandingPageComponent } from './landing-page/landing-page.component'; // Import the LandingPageComponent

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent // Declare the LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}