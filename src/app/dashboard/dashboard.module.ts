import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
