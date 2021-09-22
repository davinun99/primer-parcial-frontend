import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {getFechaForQuery, mainEndpoint} from './utils';
@Injectable({
    providedIn: 'root'
})
export class FichaService {
    private urlApi = mainEndpoint + '/stock-pwfe/fichaClinica';
    private httpOptions: object  = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'usuario': 'gustavo'
        })
    };
    constructor(private _http: HttpClient) { }
    public async createFicha(motivoConsulta:string, diagnostico:string, idDoctor:number, idCliente:number, idSubcategoria:number, obsevacion: string = ''): Promise<any> {
        // - Para registrar una ficha clínica (al cargar la pantalla de registro de ficha el cliente puede
        //     preseleccionarse si existe una reserva de turno, el campo de observación es opcional, la fecha
        //     se carga en el backend automáticamente):
        const requestObj:Object ={
            motivoConsulta, diagnostico, obsevacion,
            "idEmpleado":{
                "idPersona":idDoctor
            },
            "idCliente":{
                "idPersona":idCliente
            },
            "idTipoProducto": {
                "idTipoProducto":idSubcategoria
            }
        };
        const result = await this._http.post<any>(this.urlApi, requestObj, this.httpOptions).toPromise();
        return result;
    }
    public async updateFicha(idFichaClinica:number, observacion:string=''): Promise<any> {
        // - Para modificar la observación de una ficha (ningún otro campo se puede modificar):
        const requestObj: Object = { idFichaClinica, observacion}
        const result = await this._http.put<any>(this.urlApi, requestObj, this.httpOptions).toPromise();
        return result;
    }
    public async getFichaByDate( fechaDesde:Date,fechaHasta:Date ): Promise<any> {
        const fechaDesdeCadena: string = getFechaForQuery(fechaDesde);
        const fechaHastaCadena: string = getFechaForQuery(fechaHasta);

        const requestObj: Object = { fechaDesdeCadena, fechaHastaCadena}

        const urlApi:string = `${this.urlApi}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
        const { lista } = await this._http.get<any>(urlApi).toPromise();
        return lista;
    }
    public async getFichaByPaciente( idPaciente:number ): Promise<any> {
        // - Para obtener las fichas del paciente con id 
        const requestObj: Object = { idCliente:{
            idPersona: idPaciente
        }}
        const urlApi:string = `${this.urlApi}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
        const { lista } = await this._http.get<any>(urlApi).toPromise();
        return lista;
    }
    public async getFichaByDoctor( idDoctor:number ): Promise<any> {
        // - Para obtener las fichas registradas por el fisioterapeuta con id
        const requestObj: Object = { idEmpleado:{
            idPersona: idDoctor
        }}
        const urlApi:string = `${this.urlApi}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
        const { lista } = await this._http.get<any>(urlApi).toPromise();
        return lista;
    }
    public async getFichaBySubcategoria( idTipoProducto:number ): Promise<any> {
        // - Para obtener de la subcategoría
        const requestObj: Object = { idTipoProducto:{
            idTipoProducto
        }}
        const urlApi:string = `${this.urlApi}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
        const { lista } = await this._http.get<any>(urlApi).toPromise();
        return lista;
    }
}