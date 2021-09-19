
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { HorarioExc } from '../../model/horarioexc';
import { Paciente } from '../../model/paciente';
import { HorarioexcService } from '../../service/horarioexc.service';
import { PacienteService } from '../../service/paciente.service';

@Component({
  selector: 'app-horarioexc-agregar',
  templateUrl: './horarioexc-agregar.component.html',
  styleUrls: ['./horarioexc-agregar.component.css']
})

export class HorarioexcAgregarComponent implements OnInit {

	data: HorarioExc = new HorarioExc();
    empleados: Paciente[] = [];
	// dias = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
	Flag = [
		{ pos: 0, display: 'S' },
		{ pos: 1, display: 'N' },
	
	];

	selectedDay;

  constructor(private HorarioExcService: HorarioexcService, private pacienteService: PacienteService, private router: Router) {
    this.pacienteService.getPacientes().subscribe(
        (data) => {
            this.empleados = data.lista;
        }
    );
}


ngOnInit(): void {
}

agregarHorarioExc() {
  console.log(this.data);
  // return;
  if (this.checkFields()) {
    this.HorarioExcService.agregarHorarioExc(this.data).subscribe(
      () => {
        swal.fire({
          title: 'Actualizado!',
          text: 'El nuevo Horario Exc fue actualizado exitosamente.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        }).then(() => {
          this.router.navigate(['/horarioexc']);
        });
      },
      (error) => {
        console.log(error);
        let message = 'El horario exclusivo no pudo ser agregado. \n';
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
  }

	checkFields() {
		return true;
	}
}