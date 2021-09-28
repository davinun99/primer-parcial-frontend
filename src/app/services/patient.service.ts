import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mainEndpoint } from './utils';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private urlApiPatient = mainEndpoint + '/stock-pwfe/persona';
  public patients: Array<any> = [];

  constructor(private _http: HttpClient) { }

  private newPatientFromServer(p: any) {
    return {
      id: p.idPersona,
      name: p.nombre,
      lastName: p.apellido,
      fullName: p.nombreCompleto,
      email: p.email,
      phone: p.telefono,
      document: p.ruc || p.cedula,
      type: p.tipoPersona,
      birthday: p.fechaNacimiento
    }
  }

  private newPatientToSend(p: any): any {
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

  public async getAllPatients(): Promise<any[]> {
    const { lista } = await this._http.get<any>(this.urlApiPatient).toPromise();
    const newPatients = lista.map((p: any) => this.newPatientFromServer(p));
    this.patients = newPatients;
    return newPatients;
  }

  public async createPatient(patient: any): Promise<any> {
    const result = await this._http.post<any>(
      this.urlApiPatient,
      this.newPatientToSend(patient)
    ).toPromise();
    return this.newPatientFromServer(result);
  }

  public async editPatient(patient: any): Promise<any> {
    await this._http.put<any>(
      this.urlApiPatient,
      this.newPatientToSend(patient)).toPromise();
  }
}
