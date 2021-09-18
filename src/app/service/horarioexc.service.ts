import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { listadatos } from '../model/datos';

import endpoint from 'src/utils';
import {HorarioExc} from '../model/horarioexc';

@Injectable({
  providedIn: 'root',
})
export class HorarioexcService {
  private api: string = endpoint + "/stock-pwfe/horarioExcepcion";

  constructor(private http: HttpClient) {}

  
  getHorarioExcFecha(fechaCadena: string): Observable<listadatos<HorarioExc>> {
    const registrosEntreObj: Object = {"fechaCadena":fechaCadena};  
    return this.http.get<listadatos<HorarioExc>>(`${this.api}/?ejemplo=${encodeURIComponent(JSON.stringify(registrosEntreObj))}`);
  }

  getHorarioExcPacienteId(idPaciente: number): Observable<listadatos<HorarioExc>> {
    const registrosEntreObj: Object = {"idEmpleado":{"idPersona":idPaciente}};
    return this.http.get<listadatos<HorarioExc>>(`${this.api}/?ejemplo=${encodeURIComponent(JSON.stringify(registrosEntreObj))}`);
  }
  
  getHorarioExc(): Observable<listadatos<HorarioExc>> {
    return this.http.get<listadatos<HorarioExc>>(this.api);
  }
  
  
  agregarHorarioExc(data: HorarioExc): Observable<HorarioExc> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'usuario': 'usuario4'
    });

    return this.http.post<HorarioExc>(this.api, data,{ headers} ).pipe(
      tap(
        // Log the result or error
        (data) => console.log('agregado ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }
  editarHorarioExc(idHorarioExc: number,observacion:string ): Observable<HorarioExc> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'usuario': 'usuario4'
    });
    const body = { "idHorarioExc": idHorarioExc,"observacion":observacion  };
    return this.http.put<HorarioExc>(this.api, body,{ headers} ).pipe(
      tap(
        // Log the result or error
        (data) => console.log('editado ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }

}
