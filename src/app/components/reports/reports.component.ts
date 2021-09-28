import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from 'src/app/services/reports.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getFechaForQuery } from 'src/app/services/utils';
import { Workbook } from 'exceljs';

import * as fs from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
  public showAddModal: boolean = false;
  public editingModal: boolean = false;
  public selectedReport: any = {};
  public services: Array<any> = [];
  public fechaDesde: string;
  public idPatient: string;
  public idFisioterapeuta: string;
  public idServicio: number;
  public fechaHasta: string;
  public workbook = new Workbook();
    
  @Output() back = new EventEmitter();
  constructor(private _service: ReportService) {
    this.clearSelectedReport();
    const fecha:string = getFechaForQuery( new Date((new Date()).valueOf() - 1000*60*60*24));
    this.fechaDesde = `${fecha.substr(0,4)}-${fecha.substr(4,2)}-${fecha.substr(6)}`;
    this.fechaHasta = `${fecha.substr(0,4)}-${fecha.substr(4,2)}-${fecha.substr(6)}`;
    this.idPatient = "0";
    this.idFisioterapeuta = "0";
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
  downloadExcel(){
      //create new excel work book
    let workbook = new Workbook();    
    //add name to sheet
    let worksheet = workbook.addWorksheet("Employee Data");
      //add column name
    let header=["Name","Age"]
    let headerRow = worksheet.addRow(header);
    for (let x1 of this.services)
    {
      let x2=Object.keys(x1);
      let temp=[]
      for(let y of x2)
      {
        console.log(y)
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
    //set downloadable file name
    let fname="Emp Data Sep 2020"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
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


  ngOnInit(): void {
    this.loadService();
    this.downloadPDF();
    
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

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData') as HTMLInputElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }
}