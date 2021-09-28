import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { mainEndpoint, getFechaForQuery } from './utils';
@Injectable({
  providedIn: 'root'
})


export class ExceptionalHourService {
  private urlApiExcHour = mainEndpoint + '/stock-pwfe/horarioExcepcion';
  public exchours: Array<any> = [];

  private httpOptions: object  = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'usuario': 'usuario2'
    })
  
  };
  constructor(private _http: HttpClient) {}

  private newExcHourFromServer(h: any) {
    return {
      id: h.idEmpleado.idPersona,
      date: h.fechaCadena,
      flag: h.flagEsHabilitar,
      hourOpen: h.horaAperturaCadena,
      hourClose: h.horaCierreCadena,
      interval: h.intervaloMinutos,
    }
  }
  private newExcHourToSend(h: any): any {
    return {
      idEmpleado:{ idPersona: h.id},
      fechaCadena: h.date,
      horaAperturaCadena: h.hourOpen,
      horaCierreCadena: h.hourClose,
      intervaloMinutos: h.interval,
      flagEsHabilitar: h.flag,
    }
  }

  public async getAllExceptionHours(): Promise<any[]> {
    const { lista } = await this._http.get<any>(this.urlApiExcHour).toPromise();
    const exchours= lista.map((h: any) => this.newExcHourFromServer(h));
 
    console.log('exchours:', exchours);
    this.exchours = exchours;
    return exchours;
  }

  public async createExcHour(hour: any): Promise<any> {
    const result = await this._http.post<any>(
      this.urlApiExcHour,
      this.newExcHourToSend(hour),
      this.httpOptions
    ).toPromise();
    return this.newExcHourFromServer(result);
  }
  public async editExcHour(hour: any): Promise<any> {
    await this._http.put<any>(
      this.urlApiExcHour,
      this.newExcHourToSend(hour)).toPromise();
  }


}
