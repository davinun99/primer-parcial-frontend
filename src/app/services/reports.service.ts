import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getFechaForQuery, mainEndpoint } from './utils';

@Injectable({
  providedIn: 'root',
})

export class ReportService {
  private api: string = mainEndpoint + "/stock-pwfe/servicio";

  constructor(private http: HttpClient) {}

  public async getServiceFromTo( fechaDesde: Date, fechaHasta: Date): Promise<any[]> {
    const fechaDesdeCadena: string = getFechaForQuery(fechaDesde);
    const fechaHastaCadena: string = getFechaForQuery(fechaHasta);
    const requestObj =  {"fechaDesdeCadena":fechaDesdeCadena, "fechaHastaCadena":fechaHastaCadena}; 

    const urlApi:string = `${this.api}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }

  public async getServiceByPatientId(idPatient: number): Promise<any[]> {
    const requestObj =  {"idFichaClinica":{"idCliente":{"idPersona":idPatient}}};
    
    const urlApi:string = `${this.api}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }
  
  public async getServiceByFisioId(idFisioterapeuta: number): Promise<any[]> {
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
