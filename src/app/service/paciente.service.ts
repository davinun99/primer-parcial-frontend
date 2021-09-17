import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../model/paciente';
import { listadatos } from '../model/datos';
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";
import endpoint from 'src/utils';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
    private api: string = endpoint + "/stock-pwfe/persona";

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<listadatos<Paciente>> {
    return this.http.get<listadatos<Paciente>>(this.api);
   }
  agregarPaciente(p:Paciente): Observable<Paciente>{
    return this.http
        .post<Paciente>(this.api,p)
        .pipe(
          tap( // Log the result or error

            data => console.log('agregado '+data),
            error => console.log("error: "+error)
          )
        );
  }
}
