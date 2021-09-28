import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { mainEndpoint, getFechaForQuery } from './utils';
@Injectable({
  providedIn: 'root'
})


export class HoursService {
  private urlApiHour = mainEndpoint + '/stock-pwfe/personaHorarioAgenda';
  public hours: Array<any> = [];

  private httpOptions: object  = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'usuario': 'usuario2'
    })
  
  };
  constructor(private _http: HttpClient) {}

  private newHourFromServer(h: any) {
    return {
      id: h.idEmpleado.idPersona,
      day: h.dia,
      hourOpen: h.horaAperturaCadena,
      hourClose: h.horaCierreCadena,
      interval: h.intervaloMinutos,
    }
  }
  private newHourToSend(h: any): any {
    return {
      idEmpleado:{ idPersona: h.id},
      dia: h.day,
      horaAperturaCadena: h.hourOpen,
      horaCierreCadena: h.hourClose,
      intervaloMinutos: h.interval
    }
  }

  public async getAllHours(): Promise<any[]> {
    const { lista } = await this._http.get<any>(this.urlApiHour).toPromise();
    const hours= lista.map((h: any) => this.newHourFromServer(h));
 
    console.log('hours:', hours);
    this.hours = hours;
    return hours;
  }

  public async createHour(hour: any): Promise<any> {
    const result = await this._http.post<any>(
      this.urlApiHour,
      this.newHourToSend(hour),
      this.httpOptions
    ).toPromise();
    return this.newHourFromServer(result);
  }
  public async editHour(hour: any): Promise<any> {
    await this._http.put<any>(
      this.urlApiHour,
      this.newHourToSend(hour)).toPromise();
  }


}
