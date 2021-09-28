
import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

import { ExceptionalHourService } from 'src/app/services/exceptionalhour.service';



@Component({
  selector: 'exceptionalhour-list',
  templateUrl: './exceptionalhour.component.html',
})


export class ExceptionalHourComponent implements OnInit {


  public showAddModal: boolean = false;
  public editingModal: boolean = false;
  public selectedExcHour: any = {};
  public exchours: Array<any> = [];
  @Output() back = new EventEmitter();


  dias = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];



  constructor(private _service: ExceptionalHourService) {
    this.clearSelectedExcHour();
  }
  clearSelectedExcHour() {
    this.selectedExcHour = {
      id: '',
      date: '',
      hourOpen: '',
      hourClose: '',
      interval: '',
      flag:'',
    };
  }

  showNewClientModal() {
    this.clearSelectedExcHour();
    this.editingModal = false;
    this.showAddModal = true;
  }

  showEditModal(hour: any) {
    this.selectedExcHour = hour;
    this.showAddModal = true;
    this.editingModal = true;
  }

  async editExcHour() {
    await this._service.editExcHour(this.selectedExcHour);
    this.clearSelectedExcHour();
    this.editingModal = false;
    this.showAddModal = false;
    this.ngOnInit();
  }

  async createExcHour() {
    const newExcHour = await this._service.createExcHour(
      this.selectedExcHour
    );
    // Concat new hour
    this.exchours = this.exchours.concat(newExcHour);
    // Clear
    this.clearSelectedExcHour();
    // Close
    this.showAddModal = false;
  }

  public get isValidSelectedExcHour(): boolean {
    return !!this.selectedExcHour &&
      !!this.selectedExcHour.date &&
      !!this.selectedExcHour.hourOpen &&
      !!this.selectedExcHour.hourClose &&
      !!this.selectedExcHour.interval &&
      !!this.selectedExcHour.flag &&
      !!this.selectedExcHour.id;
  }

  public getDayFromNumber(number: number): string {
    const days = "Domingo,Lunes,Martes,Miercoles,Jueves,Viernes,Sábado".split(',');
    return days[Math.max(0, Math.min(6, number))];
  }

  async loadExcHours() {
    this.exchours = await this._service.getAllExceptionHours();
  }
  
  ngOnInit(): void {
    this.loadExcHours();
  }

  
}
