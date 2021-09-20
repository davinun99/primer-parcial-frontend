import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlApiService = 'http://181.123.243.5:8080/stock-pwfe/presentacionProducto';
  private urlApiProduct = 'http://181.123.243.5:8080/stock-pwfe/producto';
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
    const { lista } = await this._http.get<any>(this.urlApiService).toPromise();
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
