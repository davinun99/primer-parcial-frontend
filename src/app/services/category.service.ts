import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlApiCategory = 'http://181.123.243.5:8080/stock-pwfe/categoria';
  private urlApiSubCategory = 'http://181.123.243.5:8080/stock-pwfe/tipoProducto';
  public categories: Array<any> = [];
  public subCategories: Array<any> = [];

  constructor(private _http: HttpClient) { }

  public async getAllCategories(): Promise<any[]> {
    const { lista } = await this._http.get<any>(this.urlApiCategory).toPromise();
    const newCategories = lista.map((l: any) => {
      return {
        id: l.idCategoria,
        name: l.descripcion
      }
    });
    this.categories = newCategories;
    return newCategories;
  }

  public async createCategory(name: string): Promise<any> {
    const result = await this._http.post<any>(this.urlApiCategory, { descripcion: name }).toPromise();
    return { id: result.idCategoria, name: result.descripcion };
  }

  public async getAllSubCategories(): Promise<any[]> {
    const { lista } = await this._http.get<any>(this.urlApiSubCategory).toPromise();
    const newSubCategories = lista.map((l: any) => {
      return {
        id: l.idTipoProducto,
        categoryId: l.idCategoria.idCategoria,
        name: l.descripcion
      }
    });
    console.log('get all sub categories result:', newSubCategories);
    this.subCategories = newSubCategories;
    return newSubCategories;
  }

  public async createSubCategory(categoryId: any, name: string): Promise<any> {
    const result = await this._http.put<any>(
        this.urlApiSubCategory,
        { idCategoria: { idCategoria: categoryId }, descripcion: name })
      .toPromise();
    return { id: result.idCategoria, name: result.descripcion };
  }
}
