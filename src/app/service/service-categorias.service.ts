import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias } from '../model/categorias';
import { listadatos } from '../model/datos';
import {tap} from "rxjs/operators";
import endpoint from 'src/utils';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoriasService {
  private api: string = endpoint + "/stock-pwfe/categoria";
  constructor(private http: HttpClient) { }
  
  getCategorias(): Observable<listadatos<Categorias>> {
    return this.http.get<listadatos<Categorias>>(this.api);
   }

   agregarCategorias(p:Categorias): Observable<Categorias> {
  return this.http
    .post<Categorias>(this.api, p)
    .pipe(
      tap( // Log the result or error

        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    );
  }
}
