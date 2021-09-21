import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {mainEndpoint} from './utils';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private urlApi = mainEndpoint + '/stock-pwfe/persona';
  public isLogged: boolean = true;
  public user: any = { usuarioLogin: 'usuario1' };

  constructor(private _http: HttpClient) { }

  public async getAllUsers(): Promise<any[]> {
    const { lista } = await this._http.get<any>(this.urlApi).toPromise();
    return lista;
  }

  public async existUser(username: string): Promise<boolean> {
    const user = (await this.getAllUsers())
      .filter(user => user.usuarioLogin === username)[0];
    this.user = user || this.user;
    return !!user;
  }

  public async login(username: string, password: string) {
    this.isLogged = await this.existUser(username);
  }
}
