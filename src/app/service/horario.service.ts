import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { listadatos } from '../model/datos';
import { Horario } from '../model/horario';
import endpoint from 'src/utils';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private api: string = endpoint + "/stock-pwfe/personaHorarioAgenda";

  constructor(private http: HttpClient) {}

  
  getHorarioPaciente(id: number): Observable<listadatos<Horario>> {
    const pacienteObj: Object = {"idEmpleado":{"idPersona": id}};  
    return this.http.get<listadatos<Horario>>(`${this.api}/?ejemplo=${encodeURIComponent(JSON.stringify(pacienteObj))}`);
  }

  getHorarios(): Observable<listadatos<Horario>> {
    return this.http.get<listadatos<Horario>>(this.api);
  }
  
  agregarHorario(data: Horario): Observable<Horario> {
      
    return this.http.post<Horario>(this.api, data).pipe(
      tap(
        // Log the result or error
        (data) => console.log('agregado ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }


}
