import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public tab: string = 'config';

  constructor() { }

  ngOnInit(): void {
  }

}
