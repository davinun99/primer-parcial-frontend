import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';

@Component({
  selector: 'back-modal',
  templateUrl: './back-modal.component.html'
})
export class BackModalComponent implements OnInit {
  
  @Input() ngModel: boolean = false;
  @Input() canConfirm: boolean = false;
  @Input() title: string = '';
  @Input() confirmButtonText: string = 'Crear';
  @Output() ngModelChange = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<any>();

  constructor() { }

  confirm() {
    if (this.canConfirm)
      this.confirmed.emit();
  }

  ngOnInit(): void {
  }

}
