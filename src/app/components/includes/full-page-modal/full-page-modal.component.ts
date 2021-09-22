import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'full-page-modal',
  templateUrl: './full-page-modal.component.html'
})
export class FullPageModalComponent implements OnInit {

  @Input() title: string = '';
  @Input() btnAddText: string = '';
  @Output() added = new EventEmitter();
  @Output() back = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
