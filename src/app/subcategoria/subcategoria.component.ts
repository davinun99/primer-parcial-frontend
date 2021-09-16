import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Subcategoria from '../model/subcategoria';
import ServiceSubcategoria from '../service/subcategoria.service';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  subcategorias: Subcategoria[] = [];
  idCategoria: number = 0;

  constructor( private servicioSubcategorias: ServiceSubcategoria, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.queryParams.filter(params => params.idCategoria).subscribe(params => {
      this.idCategoria = params.idCategoria;
    })
    if( this.idCategoria )
    this.servicioSubcategorias.getSubcategoriasById(this.idCategoria).subscribe(
    entity => {
      this.subcategorias = entity.lista
    },error => {
      console.log('No se obtuvieron las subcategorias! ', error)
    });
  }

}
