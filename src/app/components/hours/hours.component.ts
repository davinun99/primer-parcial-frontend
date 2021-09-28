
import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

import { HoursService } from 'src/app/services/hours.service';



@Component({
  selector: 'hours-list',
  templateUrl: './hours.component.html',
})


export class HoursComponent implements OnInit {


  public showAddModal: boolean = false;
  public editingModal: boolean = false;
  public selectedHour: any = {};
  public hours: Array<any> = [];
  @Output() back = new EventEmitter();


  dias = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];



  constructor(private _service: HoursService) {
    this.clearSelectedHour();
  }
  clearSelectedHour() {
    this.selectedHour = {
      id: '',
      day: '',
      hourOpen: '',
      hourClose: '',
      interval: '',

    };
  }

  showNewClientModal() {
    this.clearSelectedHour();
    this.editingModal = false;
    this.showAddModal = true;
  }

  showEditModal(hour: any) {
    this.selectedHour = hour;
    this.showAddModal = true;
    this.editingModal = true;
  }

  async editHour() {
    await this._service.editHour(this.selectedHour);
    this.clearSelectedHour();
    this.editingModal = false;
    this.showAddModal = false;
    this.ngOnInit();
  }

  async createHour() {
    const newHour = await this._service.createHour(
      this.selectedHour
    );
    // Concat new hour
    this.hours = this.hours.concat(newHour);
    // Clear
    this.clearSelectedHour();
    // Close
    this.showAddModal = false;
  }

  public get isValidSelectedHour(): boolean {
    return !!this.selectedHour &&
      !!this.selectedHour.day &&
      !!this.selectedHour.hourOpen &&
      !!this.selectedHour.hourClose &&
      !!this.selectedHour.interval &&
      !!this.selectedHour.id;
  }

  public getDayFromNumber(number: number): string {
    const days = "Domingo,Lunes,Martes,Miercoles,Jueves,Viernes,Sábado".split(',');
    return days[Math.max(0, Math.min(6, number))];
  }

  async loadHours() {
    this.hours = await this._service.getAllHours();
  }
  
  ngOnInit(): void {
    this.loadHours();
  }

  
}
