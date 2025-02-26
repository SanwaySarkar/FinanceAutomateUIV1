import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-validation-modal',
  template: `
    <div class="modal-backdrop" (click)="closeModal()"></div>
    <div class="modal">
      <div class="modal-content">
        <p>{{ message }}</p>
        <button (click)="closeModal()" class="btn-primary">Close</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 1001;
    }
    .modal-content {
      text-align: center;
    }
  `]
})
export class ValidationModalComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}