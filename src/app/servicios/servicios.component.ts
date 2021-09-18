import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Servicio from '../model/servicio';
import ServiceServicio from '../service/servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  idSubCategoria: number = 0;
  mensaje: string = "";
  nuevoServicio: Servicio = new Servicio();
  hayServicios: Boolean = false;
  constructor( private servicioServicios: ServiceServicio, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.queryParams.filter(params => params.idSubCategoria).subscribe(params => {
      this.idSubCategoria = params.idSubCategoria;
    })
    if( this.idSubCategoria )
      this.getSubcategorias();
  }
  getSubcategorias():void{
    this.servicioServicios.getServiciosByIdTipoProducto(this.idSubCategoria).subscribe(
      entity => {
        this.hayServicios = entity.lista && entity.lista.length !== 0;
        this.servicios = entity.lista
        this.mensaje=''
      },error => {
        console.log('No se obtuvieron las subcategorias! ', error)
        this.mensaje='No se obtuvieron las subcategorias! ' + error;
      });
  }
  buscar(): void {
    this.servicioServicios.getServiciosByNombre(this.nuevoServicio.nombre).subscribe(
      entity => {
        this.hayServicios = entity.lista && entity.lista.length !== 0;
        this.servicios = entity.lista;
        this.mensaje = '';
      },
      error => {
        console.log('No se obtuvieron los servicios! ', error);
        this.mensaje = 'No se obtuvieron los servicios! ' + error;
      }
    );
  }
  guardar(): void{
    console.log('Guardando...');
  }
}
