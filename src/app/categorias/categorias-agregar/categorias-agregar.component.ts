import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/model/categorias';
import { ServiceCategoriasService } from 'src/app/service/service-categorias.service';

@Component({
  selector: 'app-categorias-agregar',
  templateUrl: './categorias-agregar.component.html',
  styleUrls: ['./categorias-agregar.component.css']
})
export class CategoriasAgregarComponent implements OnInit {
  categorias: Categorias = new Categorias();
  mensaje: string = "";
  constructor(private servicioCategorias: ServiceCategoriasService) { }
  ngOnInit(): void {
  }
  guardar(): void{
   this.servicioCategorias.agregarCategorias(this.categorias).subscribe(
     () => {
       this.mensaje='Agregado exitosamente'
     },
     error => console.log("error: "+error)
   );
  }
  
}
