import { Component, OnInit } from '@angular/core';
import { Categorias } from '../model/categorias';
import { ServiceCategoriasService } from '../service/service-categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categorias[] = [];

  constructor(private servicioCategorias: ServiceCategoriasService) { }

  ngOnInit(): void {
    this.servicioCategorias.getCategorias().subscribe(
      entity => {
        this.categorias = entity.lista
      },
      error =>console.log('no se pudieron conseguir las categorias')
     );
  }

}
