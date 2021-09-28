import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {DoctorService} from 'src/app/services/doctor.service';
import { FichaService } from 'src/app/services/ficha.service';
import {PatientService} from 'src/app/services/patient.service';
@Component({
  selector: 'record-tab',
  templateUrl: './record.component.html'
})
export class RecordComponent implements OnInit {
  public doctors: Array<any> = [];
  public patients: Array<any> = [];
  public categories: Array<any> = [];
  public subCategoriesAvailable: Array<any> = [];
  public subCategoriesAvailableForNewFicha: Array<any> = [];
  public fechaDesdeReserva: string = '';
  public fechaHastaReserva: string = '';

  public selectedDoctorId: number = 0;
  public selectedPatientId: number = 0;
  public selectedCategoryId: number = 0;
  public selectedSubCategoryId: number = 0;

  public records: Array<any> = [];

  public nuevaFicha: any = {
    idCliente: {},
    idEmpleado: {},
    idTipoProducto: {}
  };
  
  constructor( private _doctorService: DoctorService, private _patientService: PatientService, private _categoryService: CategoryService, private _fichaService: FichaService ) { }
  async loadInitialData(){
    this.patients = await this._patientService.getAllPatients();
    this.doctors = await this._doctorService.getAllFisios();
    this.categories = await this._categoryService.getAllCategories();
  }
  async handleCategoryChange(){
    this.selectedCategoryId = Number(this.selectedCategoryId);
    this.subCategoriesAvailable = await this._categoryService.getAllSubCategories();
    this.subCategoriesAvailable = this.subCategoriesAvailable.filter( subCat => ( subCat.categoryId === this.selectedCategoryId ) );
  }
  async handleNewCategoryChange(){
    this.nuevaFicha.idTipoProducto.idTipoProducto = Number(this.nuevaFicha.idTipoProducto.idTipoProducto);
    this.subCategoriesAvailableForNewFicha = await this._categoryService.getAllSubCategories();
    this.subCategoriesAvailableForNewFicha = this.subCategoriesAvailableForNewFicha.filter( subCat => ( subCat.categoryId === this.nuevaFicha.idTipoProducto.idTipoProducto ) );
  }
  async searchWithFilters(){
    this.selectedDoctorId = Number(this.selectedDoctorId);
    this.selectedPatientId = Number(this.selectedPatientId);
    this.selectedCategoryId = Number(this.selectedCategoryId);
    this.selectedSubCategoryId = Number(this.selectedSubCategoryId);

    this.records = await this._fichaService.getAllFichas();
    //Doctor
    if(this.selectedDoctorId){
      this.records = this.records.filter( record => record.idEmpleado.idPersona === this.selectedDoctorId);
    }
    //Patient
    if(this.selectedPatientId){
      this.records = this.records.filter( record => record.idCliente.idPersona === this.selectedPatientId);
    }
    //subCategories
    if(this.selectedSubCategoryId){
      this.records = this.records.filter( record => record.idTipoProducto.idTipoProducto === this.selectedSubCategoryId);
    }
    //since date
    if( this.fechaDesdeReserva !== ''){
      const fechaDesdeFormateada:string = this.fechaDesdeReserva.replace(/-/gi, '') + '00';
      this.records = this.records.filter( record => record.fechaHoraCadena >= fechaDesdeFormateada );
    }
    //to date
    if( this.fechaHastaReserva !== ''){
      const fechaHastaFormateada:string = this.fechaHastaReserva.replace(/-/gi, '') + '2359';
      this.records = this.records.filter( record => record.fechaHoraCadena <= fechaHastaFormateada );
    }
  }
  async saveRecord(){
    await this._fichaService.createFicha(this.nuevaFicha.motivoConsulta, this.nuevaFicha.diagnostico, this.nuevaFicha.idEmpleado.idPersona, this.nuevaFicha.idCliente.idPersona, this.nuevaFicha.idTipoProducto.idTipoProducto, this.nuevaFicha.observacion);
  }
  ngOnInit(): void {
    this.loadInitialData();
  }

}
