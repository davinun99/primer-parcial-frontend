import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import fichaClinica from 'src/app/model/fichaClinica';
import { FichaClinicaService } from 'src/app/service/ficha-clinica.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ficha-clinica-agregar',
  templateUrl: './ficha-clinica-agregar.component.html',
  styleUrls: ['./ficha-clinica-agregar.component.css']
})

export class FichaClinicaAgregarComponent implements OnInit {

	data: fichaClinica = new fichaClinica();
  fichaClinica: fichaClinica[] = [];
  
  constructor(private fichaClinicaService: FichaClinicaService, private router: Router) {

  }


  ngOnInit(): void {
  }

  agregarFichaClinica() {
    console.log(this.data);
    // return;
    if (this.checkFields()) {
      this.fichaClinicaService.agregarFichaClinica(this.data).subscribe(
        () => {
          swal.fire({
            title: 'Creado!',
            text: 'La nueva ficha de cliente exitosamente.',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false,
          }).then(() => {
            this.router.navigate(['/fichaclinica']);
          });
        },
        (error) => {
          console.log(error);
          let message = 'La ficha no pudo ser creada. \n';
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