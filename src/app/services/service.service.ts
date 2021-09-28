import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mainEndpoint } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlApiService = mainEndpoint + '/stock-pwfe/presentacionProducto';
  private urlApiProduct = mainEndpoint + '/stock-pwfe/producto';
  public services: Array<any> = [];
  public products: Array<any> = [];

  constructor(private _http: HttpClient) { }

  newServiceFromServer(service: any): any {
    return {
      id: service.idPresentacionProducto,
      code: service.codigo,
      flag: service.flagServicio,
      product: service.idProducto,
      name: service.nombre,
      price: service.existenciaProducto.precioVenta
    }
  }

  newProductFromServer(product: any): any {
    return {
      id: product.idProducto,
      name: product.descripcion,
      subCategory: {
        id: product.idTipoProducto.idTipoProducto,
        name: product.idTipoProducto.descripcion,
        visible: product.idTipoProducto.flagVisible === 'S'
      },
      category: {
        id: product.idTipoProducto.idCategoria.idCategoria,
        name: product.idTipoProducto.idCategoria.descripcion,
        visible: product.idTipoProducto.idCategoria.flagVisible === 'S'
      }
    }
  }

  serverFormatService(service: any): any {
    return {
      codigo: service.code,
      flagServicio: service.flag || "S",
      idProducto: {
        idProducto: service.product.id
      },
      nombre: service.name,
      existenciaProducto: {
        precioVenta: service.price
      }
    }
  }

  public async editService(service: any): Promise<any> {
    await this._http.put<any>(
      this.urlApiService,
      this.serverFormatService(service)).toPromise();
  }

  public async getAllServices(): Promise<any[]> {
    // const { lista } = await this._http.get<any>(this.urlApiService).toPromise();
    const reqObj = {"nombre":"b"};//USAMOS NOMBRE POR MIENTRAS POR QUE NO ANDA EL GET ALL
    const endpoint = `${this.urlApiService}?like=S&ejemplo=${encodeURIComponent(JSON.stringify(reqObj))}`;
    const { lista } = await this._http.get<any>(endpoint).toPromise();
    const services = lista.map((s: any) => this.newServiceFromServer(s));
    this.services = services;
    return services;
  }

  public async getAllProducts(): Promise<any[]> {
    const { lista } = await this._http.get<any>(this.urlApiProduct).toPromise();
    const products = lista.map((p: any) => this.newProductFromServer(p));
    this.products = products;
    return products;
  }

  public async createService(service: any): Promise<any> {
    const result = await this._http.put<any>(
        this.urlApiService,
        this.serverFormatService(service))
      .toPromise();
    console.log('service created result:', result);
    return this.newServiceFromServer(result);
  }
}
