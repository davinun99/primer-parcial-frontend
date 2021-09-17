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
export default class ServiceSubcategoria {
  
  private api: string = endpoint + "/stock-pwfe/tipoProducto";
  constructor(private http: HttpClient) { }
  
  getSubcategoriasById(idCategoria: number): Observable<listadatos<Subcategoria>> {
    const categoriaObj: Object = {"idCategoria":{"idCategoria": idCategoria}};
    return this.http.get<listadatos<Subcategoria>>(`${this.api}/?ejemplo=${encodeURIComponent(JSON.stringify(categoriaObj))}`);
  }
   agregarSubcategorias(subC:Subcategoria): Observable<Subcategoria> {
    return this.http
    .post<Subcategoria>(this.api, subC)
    .pipe(
      tap( // Log the result or error

        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    );
  }
  getSubcategoriasByDescripcion(descripcion: string): Observable<listadatos<Subcategoria>> {
    const categoriaObj: Object = {descripcion};
    const subcategorias: Observable<listadatos<Subcategoria>> = this.http.get<listadatos<Subcategoria>>(`${this.api}?like=S&ejemplo=${encodeURIComponent(JSON.stringify(categoriaObj))}`);
    return subcategorias;
  }
}
