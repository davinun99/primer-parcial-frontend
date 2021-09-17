import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorias } from '../model/categorias';
import Subcategoria from '../model/subcategoria';
import ServiceSubcategoria from '../service/subcategoria.service';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  subcategorias: Subcategoria[] = [];
  mensaje: string = "";
  idCategoria: number = 0;
  nuevaSubcategoria: Subcategoria = new Subcategoria();
  constructor( private servicioSubcategorias: ServiceSubcategoria, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.queryParams.filter(params => params.idCategoria).subscribe(params => {
      this.idCategoria = params.idCategoria;
    })
    if( this.idCategoria )
    this.getSubcategorias();
  }
  getSubcategorias(): void {
    this.servicioSubcategorias.getSubcategoriasById(this.idCategoria).subscribe(
      entity => {
        this.subcategorias = entity.lista
        this.mensaje=''
      },error => {
        console.log('No se obtuvieron las subcategorias! ', error)
        this.mensaje='No se obtuvieron las subcategorias! ' + error;
      });
  }
  guardar(): void{
    const categoria: Categorias = new Categorias();
    categoria.idCategoria = this.idCategoria;
    this.nuevaSubcategoria.idCategoria = categoria;
    this.servicioSubcategorias.agregarSubcategorias(this.nuevaSubcategoria).subscribe(
      () => {
        this.mensaje='Agregado exitosamente'
        this.getSubcategorias();
        this.mensaje = '';
      },
      error => {
        console.log("error: "+error)
        this.mensaje = 'No se obtuvieron las subcategorias! ' + error;
      }
    );
  }
  buscar(): void{
    this.servicioSubcategorias.getSubcategoriasByDescripcion(this.nuevaSubcategoria.descripcion).subscribe(
      entity => {
        this.subcategorias = entity.lista;
        this.mensaje = '';
      },error => {
        console.log('No se obtuvieron las subcategorias! ', error);
        this.mensaje = 'No se obtuvieron las subcategorias! ' + error;
      }
    );
  }

}
