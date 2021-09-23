import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { getFechaForQuery } from 'src/app/services/utils';

@Component({
  selector: 'reservation-tab',
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit {
  public reservations: Array<any> = [];
  public doctors: Array<any> = [];
  public selectedDoctorId: number = 0;
  public fechaReserva: string;
  constructor(private _doctorService: DoctorService, private _reservationService: ReservationService) {
    const fecha:string = getFechaForQuery( new Date() );
    this.fechaReserva = `${fecha.substr(0,4)}-${fecha.substr(4,2)}-${fecha.substr(6)}`;
  }
  async loadDoctors() {
    this.doctors = await this._doctorService.getAllFisios();
  }
  async getDoctorAgenda(){
    this.reservations = await this._reservationService.getCompleteAgenda( this.selectedDoctorId, this.fechaReserva.replace(/-/gi, '') );
  }
  ngOnInit(): void {
    this.loadDoctors();
  }

}
