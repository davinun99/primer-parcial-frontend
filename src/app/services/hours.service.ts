import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { mainEndpoint, getFechaForQuery } from './utils';
@Injectable({
  providedIn: 'root'
})


export class HoursService {
  private api: string = mainEndpoint + "/stock-pwfe/personaHorarioAgenda";
  private httpOptions: object  = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'usuario': 'gustavo'
    })
  
  };
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
