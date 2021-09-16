import { Component, OnInit } from '@angular/core';
import { Paciente } from '../model/paciente';
import { PacienteService } from '../service/paciente.service';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  pacientes: Paciente[]=[];

  constructor(private servicioPaciente: PacienteService) { }

  ngOnInit(): void {
    this.servicioPaciente.getPacientes().subscribe(
          entity => this.pacientes = entity.lista,
          error =>console.log('no se pudieron conseguir los pacientes')
    )
  }

}
