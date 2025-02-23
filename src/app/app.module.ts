import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ModalComponent } from './modal/modal.component';
import { AppComponent } from './app.component';


@NgModule({
  exports: [ModalComponent], // Export the component to use it in other modules
  declarations: [
    AppComponent,
    ModalComponent,
    // ... other components ...
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Add HttpClientModule here
    // ... other modules ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }