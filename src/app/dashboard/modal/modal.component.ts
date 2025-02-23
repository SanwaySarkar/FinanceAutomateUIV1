import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'] // Ensure this line is present
})
export class ModalComponent {
  @Input() mutFundData: any[] = [];
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}