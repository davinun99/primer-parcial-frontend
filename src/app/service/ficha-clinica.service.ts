import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { listadatos } from '../model/datos';
import { Horario } from '../model/horario';
import endpoint from 'src/utils';
import fichaClinica from '../model/fichaClinica';

@Injectable({
  providedIn: 'root',
})
export class FichaClinicaService {
  private api: string = endpoint + "/stock-pwfe/fichaClinica";

  constructor(private http: HttpClient) {}

  
  getFichasClinicasEntreFechas(fechaDesdeCadena: string, fechaHastaCadena: string): Observable<listadatos<fichaClinica>> {
    const registrosEntreObj: Object = {"fechaDesdeCadena":fechaDesdeCadena, "fechaHastaCadena":fechaHastaCadena};  
    return this.http.get<listadatos<fichaClinica>>(`${this.api}/?ejemplo=${encodeURIComponent(JSON.stringify(registrosEntreObj))}`);
  }

  getFichaClinicaPacienteId(idPaciente: number): Observable<listadatos<fichaClinica>> {
    const registrosEntreObj: Object = {"idCliente":{"idPersona":idPaciente}};
    return this.http.get<listadatos<fichaClinica>>(`${this.api}/?ejemplo=${encodeURIComponent(JSON.stringify(registrosEntreObj))}`);
  }
  getFichaClinicaFisioterapeutaId(idEmpleado: number): Observable<listadatos<fichaClinica>> {
    const registrosEntreObj: Object = {"idEmpleado":{"idPersona":idEmpleado}};
    return this.http.get<listadatos<fichaClinica>>(`${this.api}/?ejemplo=${encodeURIComponent(JSON.stringify(registrosEntreObj))}`);
  }
  getFichaClinicaSubCategoriaId(idTipoProducto: number): Observable<listadatos<fichaClinica>> {
    const registrosEntreObj: Object = {"idTipoProducto":{"idTipoProducto":idTipoProducto}};
    return this.http.get<listadatos<fichaClinica>>(`${this.api}/?ejemplo=${encodeURIComponent(JSON.stringify(registrosEntreObj))}`);
  }

  
  agregarFichaClinica(data: fichaClinica): Observable<fichaClinica> {
      
    return this.http.post<fichaClinica>(this.api, data).pipe(
      tap(
        // Log the result or error
        (data) => console.log('agregado ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }


}
