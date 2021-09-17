import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listadatos } from '../model/datos';
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";
import endpoint from 'src/utils';
import Servicio from '../model/servicio';


@Injectable({
  providedIn: 'root'
})
export default class ServiceServicio {
  
  private api: string = endpoint + "/stock-pwfe/presentacionProducto";
  constructor(private http: HttpClient) { }
  getProductoByTipoProducto(idTipoProducto: number){

  }

  getServiciosByIdTipoProducto(idTipoProducto: number): Observable<listadatos<Servicio>> {
    const reqObj: Object = {idProducto: {idTipoProducto: {idTipoProducto}}};
    return this.http.get<listadatos<Servicio>>(`${this.api}?ejemplo=${encodeURIComponent(JSON.stringify(reqObj))}`);
  }
   agregarServicios(subC:Servicio): Observable<Servicio> {
       //FIX THIS!!
    return this.http
    .post<Servicio>(this.api, subC)
    .pipe(
      tap(
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    );
  }
  getServiciosByNombre(nombre: string): Observable<listadatos<Servicio>> {
    const reqObj: Object = { nombre };
    const subcategorias: Observable<listadatos<Servicio>> = this.http.get<listadatos<Servicio>>(`${this.api}?like=S&ejemplo=${encodeURIComponent(JSON.stringify(reqObj))}`);
    return subcategorias;
  }
}
