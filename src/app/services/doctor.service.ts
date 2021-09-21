import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mainEndpoint } from './utils';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private urlApiDoctor = mainEndpoint + '/stock-pwfe/personaHorarioAgenda';
  public doctors: Array<any> = [];

  constructor(private _http: HttpClient) { }

  private newDoctorFromServer(d: any) {
    const p = d.idEmpleado;
    return {
      id: p.idPersona,
      name: p.nombre,
      lastName: p.apellido,
      fullName: p.nombreCompleto,
      email: p.email,
      phone: p.telefono,
      document: p.ruc || p.cedula,
      type: p.tipoPersona,
      birthday: p.fechaNacimiento,
      calendar: {
        day: d.dia,
        startHour: d.horaAperturaCadena,
        endHour: d.horaCierreCadena,
        interval: d.intervaloMinutos
      }
    }
  }

  private newDoctorToSend(p: any): any {
    return {
      idPersona: p.id,
      nombre: p.name,
      apellido: p.lastName,
      nombreCompleto: p.fullName,
      email: p.email,
      telefono: p.phone,
      ruc: p.document,
      cedula:p.document,
      tipoPersona: p.type,
      fechaNacimiento: p.birthday + ' 00:00:01.1'
    }
  }

  public async getAllDoctors(): Promise<any[]> {
    const { lista } = await this._http.get<any>(this.urlApiDoctor).toPromise();
    let newDoctors = lista
      .map((d: any) => this.newDoctorFromServer(d))
      .reduce((result: any, d: any) => {
        return {
          ...result,
          [d.id]: {
            ...d,
            calendars: ((result[d.id] || {}).calendars || []).concat(d.calendar)
          }
        }
      }, {});
    newDoctors = Object.values(newDoctors);
    console.log('doctors:', newDoctors);
    this.doctors = newDoctors;
    return newDoctors;
  }

  public async createDoctor(doctor: any): Promise<any> {
    const result = await this._http.post<any>(
      this.urlApiDoctor,
      this.newDoctorToSend(doctor)
    ).toPromise();
    return this.newDoctorFromServer(result);
  }

  public async editDoctor(doctor: any): Promise<any> {
    await this._http.put<any>(
      this.urlApiDoctor,
      this.newDoctorToSend(doctor)).toPromise();
  }
}
