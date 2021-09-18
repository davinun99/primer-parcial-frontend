import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HorarioexcService } from '../service/horarioexc.service';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { HorarioExc } from '../model/horarioexc';
import { Paciente } from '../model/paciente';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-horarioexc',
  templateUrl: './horarioexc.component.html',
  styleUrls: ['./horarioexc.component.css']
})
export class HorarioexcComponent implements OnInit, AfterViewInit, OnDestroy {
  fechas={
    fechaDesdeCadena:null,
    fechaHastaCadena:null,
  }
  idPaciente:null;
  idEmpleado:null;

  HorarioExc: HorarioExc[];

  paciente: Paciente = new Paciente();
  idPersona: number = 0;
  public dataTable: DataTable;

  dias = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  dtTrigger: Subject<any> = new Subject<any>();

  
  constructor(private HorarioExcService: HorarioexcService,  private route: ActivatedRoute,private router: Router) 
  {

  }

  ngOnInit(): void {
    this.HorarioExcService.getHorarioExc().subscribe(
      entity => {
        this.HorarioExc = entity.lista
      },
      error =>console.log('no se pudieron conseguir las los horarios de excepciones')
     );
     
      this.dataTable = {
        headerRow: ['Dia','Hora de Apertura','Hora de Cierre','Intervalo','Empleado', 'Habilitado'],
        footerRow: ['Dia','Hora de Apertura','Hora de Cierre','Intervalo','Empleado', 'Habilitado'],
        dataRows: [],
       };

  }

  getHorarioExcFecha(): void {
    this.HorarioExcService.getHorarioExcFecha(this.fechas.fechaDesdeCadena).subscribe(entity=>{
      this.HorarioExc=entity.lista;
      this.dtTrigger.next();

    },error => {
      console.log('No se obtuvieron las horarios excepcionales para ese dia! ', error)
    });
  }
  getHorarioExcPacienteId(): void {
    this.HorarioExcService.getHorarioExcPacienteId(this.idPaciente).subscribe(entity=>{
      this.HorarioExc=entity.lista;
      this.dtTrigger.next();

    },error => {
      console.log('No se obtuvieron las fichas clinicas! ', error)
    });
  }
  ngOnDestroy(): void {
  }
  idHorarioExc: null;
  observacion:null;
  

  editarHorarioExc() {

    
      this.HorarioExcService.editarHorarioExc(this.idHorarioExc,this.observacion).subscribe(
        () => {
          swal.fire({
            title: 'Editado!',
            text: 'Se edito el Horario Excepcional exitosamente.',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false,
          }
          ).then(() => {
            this.router.navigate(['/horarioexc']);
            location.reload();
          });
        },
        (error) => {
          console.log(error);
          let message = 'La ficha no pudo ser editada. \n';
          message += error.error ? error.error : error.message;
          swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-danger',
            },
              buttonsStyling: false,
            });
          }
        );
      
    }
 
  ngAfterViewInit() {
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    const table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function(e) {
      let $tr = $(this).closest('tr');
      if ($($tr).hasClass('child')) {
        $tr = $tr.prev('.parent');
      }

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
      e.preventDefault();
    });

    // Delete a record
    table.on('click', '.remove', function(e) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function(e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }

}
