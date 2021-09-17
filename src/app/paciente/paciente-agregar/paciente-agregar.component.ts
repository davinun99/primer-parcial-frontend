import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-paciente-agregar',
  templateUrl: './paciente-agregar.component.html',
  styleUrls: ['./paciente-agregar.component.css']
})
export class PacienteAgregarComponent implements OnInit {
  paciente: Paciente = new Paciente();
  mensaje: string = "";
  constructor(private servicioPaciente: PacienteService) { }

  ngOnInit(): void {
  }
  guardar(): void {
    this.servicioPaciente.agregarPaciente(this.paciente).subscribe(
    () => {
           this.mensaje='Agregado exitosamente!'
         },
         error => console.log("error: "+error)
    );
  }
}

