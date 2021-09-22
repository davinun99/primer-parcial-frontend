import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  public loging: boolean = false;
  public errorMessage: string = '';

  constructor(private _service: AccountService) { }

  public async login() {
    this.errorMessage = '';
    // Validate inputs
    if (!this.username || !this.password) {
      this.errorMessage = 'Nombre de usuario y contraseña son requeridos.';
      return;
    }
    //
    // Start login
    //
    this.loging = true;
    // Login from server
    await this._service.login(this.username, this.password);
    // Check login state
    if (this._service.isLogged) { /* TODO: Go to next page? */ } 
    else this.errorMessage = 'El nombre de usuario no existe.';
    // Finalize login
    this.loging = false;
  }

  ngOnInit(): void { }

}
