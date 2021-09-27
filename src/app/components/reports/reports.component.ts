import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from 'src/app/services/reports.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  @Output() back = new EventEmitter();
  constructor(private _service: ReportService) {
    this.clearSelectedReport();
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


  ngOnInit(): void {
    this.loadService();
    this.downloadPDF();
    
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