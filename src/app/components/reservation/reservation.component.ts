import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { getFechaForQuery } from 'src/app/services/utils';

@Component({
  selector: 'reservation-tab',
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit {
  public reservations: Array<any> = [];
  public patients: Array<any> = [];
  public doctors: Array<any> = [];
  public selectedDoctorId: number = 0;
  public selectedPatientId: number = 0;
  public fechaDesdeReserva: string;
  public fechaHastaReserva: string;
  constructor(private _doctorService: DoctorService, private _reservationService: ReservationService, private _patienService: PatientService) {
    const fecha:string = getFechaForQuery( new Date((new Date()).valueOf() - 1000*60*60*24));
    this.fechaDesdeReserva = `${fecha.substr(0,4)}-${fecha.substr(4,2)}-${fecha.substr(6)}`;
    this.fechaHastaReserva = `${fecha.substr(0,4)}-${fecha.substr(4,2)}-${fecha.substr(6)}`;
  }
  async deleteReservation(idReserva: number){
    await this._reservationService.cancelReservation(idReserva);
    await this.getDoctorAgenda();
  }
  async reservate(reservation: any){
    if(this.selectedDoctorId && this.selectedPatientId && reservation){
      let {fechaCadena, horaInicioCadena, horaFinCadena} = reservation;
      await this._reservationService.createReservation(fechaCadena,horaInicioCadena, horaFinCadena, this.selectedDoctorId, this.selectedPatientId);
      await this.getDoctorAgenda();
    }else{
      console.log('Error reserving...');
    }
  }
  async loadPatients(){
    try{
      this.patients = await this._patienService.getAllPatients();
    }catch(error){
      console.log(error);
    }
  }
  async loadDoctors() {
    try {
      this.doctors = await this._doctorService.getAllFisios(); 
    } catch (error) {
      console.log(error);
    }

  }
  async getDoctorAgenda(){
    this.reservations = await this._reservationService.getCompleteAgenda( this.selectedDoctorId, this.fechaDesdeReserva.replace(/-/gi, ''),  this.fechaHastaReserva.replace(/-/gi, ''));  
  }
  ngOnInit(): void {
    this.loadDoctors();
    this.loadPatients();
  }

}
