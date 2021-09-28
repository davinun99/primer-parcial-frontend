import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from 'src/app/services/reports.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getFechaForQuery } from 'src/app/services/utils';
import { Workbook } from 'exceljs';

import * as fs from 'file-saver';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-registrar-factura',
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css']
})

export class RegistrarFacturaComponent implements OnInit {
  public showAddModal: boolean = false;
  public editingModal: boolean = false;
  public selectedReport: any = {};
  public services: Array<any> = [];
  public fichas: Array<any> = [];
  public fechaDesde: string;
  public idPatient: string;
  public idFisioterapeuta: string;
  public idServicio: number;
  public fechaHasta: string;
  public workbook = new Workbook();
  public products: Array<any> = [];
  public selectedService: any = null;

  public selectedFichaId: number = 0;
  public obs: string;

  

  clearSelectedService() {
    this.selectedService = null;
  }
  
    
  @Output() back = new EventEmitter();
  constructor(private _service: FacturaService) {
    this.clearSelectedReport();
    const fecha:string = getFechaForQuery( new Date((new Date()).valueOf() - 1000*60*60*24));
    this.fechaDesde = `${fecha.substr(0,4)}-${fecha.substr(4,2)}-${fecha.substr(6)}`;
    this.fechaHasta = `${fecha.substr(0,4)}-${fecha.substr(4,2)}-${fecha.substr(6)}`;
    this.idPatient = "";
    this.idFisioterapeuta = "";
    this.obs = "";
    this.idServicio = 0;

  }
  clearSelectedReport() {
    this.selectedReport = {
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
    this.clearSelectedReport();
    this.editingModal = false;
    this.showAddModal = true;
  }

  showEditModal(report: any) {
    this.clearSelectedReport = report;
    this.showAddModal = true;
    this.editingModal = true;
  }

  public get isValidSelectedDoctor(): boolean {
    return !!this.selectedReport &&
      !!this.selectedReport.name &&
      !!this.selectedReport.lastName &&
      !!this.selectedReport.document &&
      !!this.selectedReport.phone &&
      !!this.selectedReport.type &&
      !!this.selectedReport.birthday;
  }
  async loadService() {
    this.services = await this._service.getAllDetailService();
  }

  async loadServicesFromServer() {

    this.products = await this._service.getAllProducts();
    console.log(this.products);
  }
  ngOnInit(): void {
    this.loadService();

    this.getAllFicha();
    this.loadServicesFromServer();
    this.clearSelectedService();
    
  }
  async getServiceFromTo(){
    this.services = await this._service.getServiceFromTo( this.fechaDesde, this.fechaHasta);  
  }
  async getServiceByPatientId(){
    this.services = await this._service.getServiceByPatientId( this.idPatient);  
  }
  async getServiceByFisioId(){
    this.services = await this._service.getServiceByFisioId( this.idFisioterapeuta);  
  }
  async getDetailServiceById(){
    this.services = await this._service.getDetailServiceById( this.idServicio);  
  }
  async getAllFicha(){
    this.fichas = await this._service.getAllFicha();  
  }
  public get isValidSelectedService(): boolean {
    return true;
  }
  async confirmAction() {

    // Create new service
    await this.createDetalle();
  }

  async createService() {
    this.showAddModal=true
    const newService = await this._service.createFacturaCabecera(this.obs, this.selectedFichaId );
    this.services = this.services.concat(newService);
    console.log(newService);
    this.idServicio = newService.idServicio;
    //this.clearSelectedService();
    //this.showAddModal = false;
  }
  async createDetalle() {
    this.showAddModal=false
    console.log(this.selectedService);
    const newService = await this._service.createFacturaDetalle(1, this.selectedService.idTipoProducto.idTipoProducto,this.idServicio );
    console.log(newService);
  }


}