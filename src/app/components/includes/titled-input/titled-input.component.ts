import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'titled-input',
  templateUrl: './titled-input.component.html'
})
export class TitledInputComponent implements OnInit {

  @Input() title: string = '';
  @Input() type: string = 'text';
  @Input() ngModel: string = '';

  @Output() ngModelChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
