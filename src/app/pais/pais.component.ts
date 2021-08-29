import { Component, OnInit } from '@angular/core';
import { Pais } from '../model/pais';
import { ServicepaisService } from '../service/servicepais.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
  paises: Pais[] = [];
  constructor(private servicioPais: ServicepaisService) { }

  ngOnInit(): void {
    this.servicioPais.getPaises().subscribe(
      entity => this.paises = entity.lista,
      error =>console.log('no se pudieron conseguir los paises')
     );
  }

}
