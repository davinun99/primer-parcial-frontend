import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'main-layout',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  constructor(private _accountService: AccountService) { }

  get username(): string {
    return this._accountService.user.usuarioLogin;
  }

  logout() {
    this._accountService.isLogged = false;
  }

  ngOnInit(): void {
  }

}
