import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listadatos } from '../model/datos';
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";
import endpoint from 'src/utils';
import Subcategoria from '../model/subcategoria';


@Injectable({
  providedIn: 'root'
})
export class ServicepaisService {
  
  private api: string = endpoint + "/stock-pwfe/tipoProducto";
  constructor(private http: HttpClient) { }
  
  getSubcategoriasById(idCategoria: number): Observable<listadatos<Subcategoria>> {
    const categoriaObj: Object = {"idCategoria":{"idCategoria": idCategoria}};
    return this.http.get<listadatos<Subcategoria>>(`${this.api}/?ejemplo=${encodeURIComponent(JSON.stringify(categoriaObj))}`);
  }
   agregarSubcategorias(p:Subcategoria): Observable<Subcategoria> {
  return this.http
    .post<Subcategoria>(this.api, p)
    .pipe(
      tap( // Log the result or error

        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    );
  }
  
}
