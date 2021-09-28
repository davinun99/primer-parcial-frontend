import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front1v1';

  constructor(private _accountService: AccountService) {
    
  }

  get isLogged(): boolean {
    return this._accountService.isLogged;
  }
}
