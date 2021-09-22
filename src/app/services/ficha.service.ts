import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {mainEndpoint} from './utils';
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
    public async createFicha(): Promise<any> {
        // - Para registrar una ficha clínica (al cargar la pantalla de registro de ficha el cliente puede
        //     preseleccionarse si existe una reserva de turno, el campo de observación es opcional, la fecha
        //     se carga en el backend automáticamente):
        //     POST /stock-pwfe /fichaClinica
        //     Header: Content-Type: application/json;usuario :gustavo
        //     Body:
        //     {
        //     "motivoConsulta": "dolor en la rodilla",
        //     "diagnostico":"lesion leve, fisioterapia 10 sesiones",
        //     "observacion":"nada grave",
        //     "idEmpleado":{
        //     "idPersona":4
        //     },
        //     "idCliente":{
        //     "idPersona":6
        //     },
        //     "idTipoProducto": {
        //     "idTipoProducto":3
        //     }
        //     }
    }
    public async updateFicha(): Promise<any> {
        // - Para modificar la observación de una ficha (ningún otro campo se puede modificar):
        // PUT /stock-pwfe /fichaClinica
        // Header: Content-Type: application/json;usuario :gustavo
        // Body:
        // {
        // "idFichaClinica":2,
        // "observacion":"hola"
        // }
    }
    public async getFichaByDate( fecha:Date ): Promise<any> {
        //   Para obtener el listado de fichas registrado el 1 de septiembre
        // GET /stock-pwfe
        // /fichaClinica?ejemplo={"fechaDesdeCadena":"20190901","fechaHastaCadena":"20190901"}
    }
    public async getFichaByPaciente( idPaciente:number ): Promise<any> {
        // - Para obtener las fichas del paciente con id = 7
        // GET /stock-pwfe /fichaClinica?ejemplo={"idCliente":{"idPersona":7}}
    }
    public async getFichaByDoctor( idDoctor:number ): Promise<any> {
        // - Para obtener las fichas registradas por el fisioterapeuta con id=3
        // GET /stock-pwfe /fichaClinica?ejemplo={"idEmpleado":{"idPersona":3}}
    }
    public async getFichaBySubcategoria( idTipoProducto:number ): Promise<any> {
        // - Para obtener de la subcategoría 4
        // GET /stock-pwfe /fichaClinica?ejemplo={"idTipoProducto":{"idTipoProducto":4}}
    }
}