
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Horario } from '../model/horario';
import { HorarioService } from '../service/horario.service';

import { Subject } from 'rxjs';
import swal from 'sweetalert2';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
})
export class HorarioComponent implements OnInit, AfterViewInit, OnDestroy {
  horario: Horario[] = [];
  public dataTable: DataTable;

  dias = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private horarioService: HorarioService, private router: Router) {}

  ngOnInit(): void {
    
    this.dataTable = {
      headerRow: ['Dia','Hora de Apertura','Hora de Cierre','Intervalo','Empleado', 'Actions'],
      footerRow: ['Dia','Hora de Apertura','Hora de Cierre','Intervalo','Empleado', 'Actions'],
      dataRows: [],
    };

    this.horarioService.getHorarios().subscribe(
      (entity) => {
        this.horario = entity.lista;
        this.dtTrigger.next();
      },
      (error) => console.log('no hay horarios')
    );
  }


  ngAfterViewInit() {}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


 

  editar(p: Horario) {
    throw new Error('No implementado');
    // this.router.navigate(['/paciente/edit/', p.idPersona]);
  }

  eliminar(e: Horario) {
    throw new Error('No implementado');

    
  }
}
