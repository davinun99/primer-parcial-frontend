import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'config-tab',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit {

  public tab: string = 'personal';

  constructor() { }

  ngOnInit(): void {
  }

}
