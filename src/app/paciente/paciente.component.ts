import { Component, OnInit } from '@angular/core';
import { Paciente } from '../model/paciente';
import { PacienteService } from '../service/paciente.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}
declare const $: any;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  public dataTable: DataTable;
  pacientes: Paciente[]=[];

  constructor(private servicioPaciente: PacienteService) { }

  ngOnInit(): void {
    this.servicioPaciente.getPacientes().subscribe(
          entity => this.pacientes = entity.lista,
          error =>console.log('no se pudieron conseguir los pacientes')
    );
    this.dataTable = {
      headerRow: [ 'Id', 'Nombre','Apellido','Telefono','Email','cedula','Tipo','Acciones'],
      footerRow: [ 'Id', 'Nombre','Apellido','Telefono','Email','cedula','Tipo','Acciones'],

      dataRows: [
      ]
   };

  }
  

}


