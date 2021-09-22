import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'doctor-list',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit {

  public showAddModal: boolean = false;
  public editingModal: boolean = false;
  public selectedDoctor: any = {};
  public doctors: Array<any> = [];
  @Output() back = new EventEmitter();

  constructor(private _service: DoctorService) {
    this.clearSelectedDoctor();
  }

  clearSelectedDoctor() {
    this.selectedDoctor = {
      id: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      document: '',
      type: 'FISICA',
      birthday: '',
    };
  }

  showNewClientModal() {
    this.clearSelectedDoctor();
    this.editingModal = false;
    this.showAddModal = true;
  }

  showEditModal(doctor: any) {
    this.selectedDoctor = doctor;
    this.showAddModal = true;
    this.editingModal = true;
  }

  async editDoctor() {
    await this._service.editDoctor(this.selectedDoctor);
    this.clearSelectedDoctor();
    this.editingModal = false;
    this.showAddModal = false;
    this.ngOnInit();
  }

  async createDoctor() {
    const newDoctor = await this._service.createDoctor(
      this.selectedDoctor
    );
    // Concat new doctor
    this.doctors = this.doctors.concat(newDoctor);
    // Clear
    this.clearSelectedDoctor();
    // Close
    this.showAddModal = false;
  }

  public get isValidSelectedDoctor(): boolean {
    return !!this.selectedDoctor &&
      !!this.selectedDoctor.name &&
      !!this.selectedDoctor.lastName &&
      !!this.selectedDoctor.document &&
      !!this.selectedDoctor.phone &&
      !!this.selectedDoctor.type &&
      !!this.selectedDoctor.birthday;
  }

  public getDayFromNumber(number: number): string {
    const days = "Domingo,Lunes,Martes,Miercoles,Jueves,Viernes,Sábado".split(',');
    return days[Math.max(0, Math.min(6, number))];
  }

  async loadDoctors() {
    this.doctors = await this._service.getAllDoctors();
  }

  ngOnInit(): void {
    this.loadDoctors();
  }


}
