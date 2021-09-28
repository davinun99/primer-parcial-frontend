import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mainEndpoint, getFechaForQuery } from './utils';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private urlApiPersona = mainEndpoint + '/stock-pwfe/persona';
  private urlApiReserva = mainEndpoint + '/stock-pwfe/reserva';
  private httpOptions: object  = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'usuario': 'usuario2'
    })
  
  };
  constructor(private _http: HttpClient) { }
  
  mapReservations = (reservation:any) => ({
    ...reservation, 
    fecha:  new Date(reservation.fecha).toLocaleDateString(),
    horaInicio: reservation.horaInicio.length <= 9 ? reservation.horaInicio.substr(0,5): reservation.horaInicio.substr(11,5),
    horaFin: reservation.horaFin.length <= 9 ? reservation.horaFin.substr(0,5): reservation.horaFin.substr(11,5),
    flagAsistio: reservation.flagAsistio ? 'Si' : 'No',
    flagReserva: Number.isInteger(reservation.idReserva) ? 'Si' : 'No',
  });
  public async getCompleteAgenda(idFisioterapeuta: number, fechaDesde: string, fechaHasta: string): Promise<any[]> {
    const urlApi:string = `${this.urlApiPersona}/${idFisioterapeuta}/agenda?fecha=${fechaDesde}`;
    let obj:any = await this._http.get<any>(urlApi).toPromise();
    obj = obj.map(this.mapReservations);
    return obj;
  }

  public async getFreeAgenda(idFisioterapeuta: number, fecha: Date): Promise<any[]> {
    const urlApi:string = `${this.urlApiPersona}/${idFisioterapeuta}/agenda?fecha=${getFechaForQuery(fecha)}&disponible=S`;
    const { lista } = await this._http.get<any>(urlApi).toPromise();
    return lista;
  }
  public async getBusyAgenda(idFisioterapeuta: number, fechaDesde: Date, fechaHasta: Date): Promise<any[]> {
    const fechaDesdeCadena: string = getFechaForQuery(fechaDesde);
    const fechaHastaCadena: string = getFechaForQuery(fechaHasta);
    const requestObj:Object = {
      idEmpleado:{
        idPersona:idFisioterapeuta
      },fechaDesdeCadena, fechaHastaCadena
    };
    const urlApi:string = `${this.urlApiReserva}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
    const { lista } = await this._http.get<any>(urlApi).toPromise();
    return lista;
  }

  public async createReservation(fechaCadena:string, horaInicioCadena:string, horaFinCadena:string, idEmpleado:number, idCliente:number ): Promise<any> {
    const requestObj:Object = {
      fechaCadena, horaInicioCadena, horaFinCadena, idEmpleado: {
        idPersona: Number(idEmpleado)
      }, idCliente: {
        idPersona: Number(idCliente)
      }
    };
    const result = await this._http.post<any>(this.urlApiReserva, requestObj, this.httpOptions).toPromise();
    return result;
  }
  public async updateReservation(idReserva:number, observacion: string, flagAsistio: string): Promise<any> {
    const requestObj: Object = {
      idReserva, observacion, flagAsistio
    };
    const result = await this._http.put<any>(this.urlApiReserva, requestObj).toPromise();
    return result;
  }
  public async cancelReservation( idReserva:number ): Promise<any> {
    const result = await this._http.delete<any>(this.urlApiReserva + '/' + idReserva).toPromise();
    return result;
  }
}
