import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/model/pais';
import { ServicepaisService } from 'src/app/service/servicepais.service';

@Component({
  selector: 'app-pais-agregar',
  templateUrl: './pais-agregar.component.html',
  styleUrls: ['./pais-agregar.component.css']
})
export class PaisAgregarComponent implements OnInit {

  pais: Pais = new Pais();
  mensaje: string = "";
  constructor(private servicioPais: ServicepaisService) { }
  ngOnInit(): void {
  }
  guardar(): void{
   this.servicioPais.agregarPais(this.pais).subscribe(
     () => {
       this.mensaje='Agregado exitosamente'
     },
     error => console.log("error: "+error)
   );
  }
  
}
