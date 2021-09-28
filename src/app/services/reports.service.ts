import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getFechaForQuery, mainEndpoint } from './utils';

@Injectable({
  providedIn: 'root',
})

export class ReportService {
  private api: string = mainEndpoint + "/stock-pwfe/servicio";

  constructor(private http: HttpClient) {}

  public async getServiceFromTo( fechaDesde: string, fechaHasta: string): Promise<any[]> {
    const fechaDesdeCadena: string = fechaDesde.replace(/-/gi, '');
    const fechaHastaCadena: string = fechaHasta.replace(/-/gi, '');
    const requestObj =  {"fechaDesdeCadena":fechaDesdeCadena, "fechaHastaCadena":fechaHastaCadena}; 

    const urlApi:string = `${this.api}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }

  public async getServiceByPatientId(idPatient: string): Promise<any[]> {
    const requestObj =  {"idFichaClinica":{"idCliente":{"idPersona":idPatient}}};
    
    const urlApi:string = `${this.api}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }
  
  public async getServiceByFisioId(idFisioterapeuta: string): Promise<any[]> {
    const requestObj =  {"idEmpleado":{"idPersona":idFisioterapeuta}};
    
    const urlApi:string = `${this.api}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }

  public async getDetailServiceById(id: number): Promise<any[]> {
    const urlApi:string = `${this.api}/${id}/detalle`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }


  public async getAllDetailService(): Promise<any[]> {
    const { lista } = await this.http.get<any>(this.api).toPromise();
    return lista;
  }
}
