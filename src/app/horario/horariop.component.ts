
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Horario } from '../model/horario';
import { HorarioService } from '../service/horario.service';
import { Paciente } from '../model/paciente';

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
export class HorariopComponent implements OnInit, AfterViewInit, OnDestroy {
  horario: Horario[] = [];
  paciente: Paciente = new Paciente();
  idPersona: number = 0;
  public dataTable: DataTable;

  dias = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private horarioService: HorarioService,  private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    console.log("HOLA")
    this.dataTable = {
      headerRow: ['Dia','Hora de Apertura','Hora de Cierre','Intervalo','Empleado', 'Actions'],
      footerRow: ['Dia','Hora de Apertura','Hora de Cierre','Intervalo','Empleado', 'Actions'],
      dataRows: [],
    };

    this.route.queryParams.filter(params => params.idPersona).subscribe(params => {
      this.idPersona = params.idPersona;
    })
    if( this.idPersona )
    this.getHorariosPaciente();
  }

  getHorariosPaciente(): void {
    this.horarioService.getHorarioPaciente(this.idPersona).subscribe(entity=>{
      this.horario=entity.lista;
      this.dtTrigger.next();
      console.log("HOLA")
    },error => {
      console.log('No se obtuvieron horarios! ', error)
    });


   
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
