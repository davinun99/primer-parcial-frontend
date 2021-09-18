import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FichaClinicaService } from '../service/ficha-clinica.service';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';
import fichaClinica from '../model/fichaClinica';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css']
})
export class FichaClinicaComponent implements OnInit, AfterViewInit, OnDestroy {
  fechas={
    fechaDesdeCadena:null,
    fechaHastaCadena:null,
  }
  idPaciente:null;
  idEmpleado:null;
  idTipoProducto:null;

  fichaClinica: fichaClinica[];
  dtTrigger: Subject<any> = new Subject<any>();
  public dataTable: DataTable;

  constructor(private fichaClinicaService: FichaClinicaService,  private route: ActivatedRoute,private router: Router) 
  {

  }

  ngOnInit(): void {
    this.fichaClinicaService.getFichaClinica().subscribe(
      entity => {
        this.fichaClinica = entity.lista
      },
      error =>console.log('no se pudieron conseguir las fichas clinicas')
     );
     
      this.dataTable = {
          headerRow: [ 'idFichaClinica','motivoConsulta', 'diagnostico','observacion','idEmpleado','idCliente','idTipoProducto','idCategoria' ],
          footerRow: [ 'idFichaClinica','motivoConsulta', 'diagnostico','observacion','idEmpleado','idCliente','idTipoProducto','idCategoria' ],

          dataRows: [
          ]
       };

  }

  getFichasClinicasEntreFechas(): void {
    this.fichaClinicaService.getFichasClinicasEntreFechas(this.fechas.fechaDesdeCadena,this.fechas.fechaHastaCadena).subscribe(entity=>{
      this.fichaClinica=entity.lista;
      this.dtTrigger.next();

    },error => {
      console.log('No se obtuvieron las fichas clinicas! ', error)
    });
  }
  getFichaClinicaPacienteId(): void {
    this.fichaClinicaService.getFichaClinicaPacienteId(this.idPaciente).subscribe(entity=>{
      this.fichaClinica=entity.lista;
      this.dtTrigger.next();

    },error => {
      console.log('No se obtuvieron las fichas clinicas! ', error)
    });
  }
  getFichaClinicaFisioterapeutaId(): void {
    this.fichaClinicaService.getFichaClinicaFisioterapeutaId(this.idEmpleado).subscribe(entity=>{
      this.fichaClinica=entity.lista;
      this.dtTrigger.next();

    },error => {
      console.log('No se obtuvieron las fichas clinicas! ', error)
    });
  }
  getFichaClinicaSubCategoriaId(): void {
    this.fichaClinicaService.getFichaClinicaSubCategoriaId(this.idTipoProducto).subscribe(entity=>{
      this.fichaClinica=entity.lista;
      this.dtTrigger.next();

    },error => {
      console.log('No se obtuvieron las fichas clinicas! ', error)
    });
  }

  ngOnDestroy(): void {
  }
  idFichaClinica: null;
  observacion:null;
  

  editarFichaClinica() {

    
      this.fichaClinicaService.editarFichaClinica(this.idFichaClinica,this.observacion).subscribe(
        () => {
          swal.fire({
            title: 'Editado!',
            text: 'Se edito la ficha de cliente exitosamente.',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false,
          }
          ).then(() => {
            this.router.navigate(['/fichaclinica']);
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
