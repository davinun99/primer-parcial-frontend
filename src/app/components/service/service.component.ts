import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'service-list',
  templateUrl: './service.component.html'
})
export class ServiceComponent implements OnInit {

  public services: Array<any> = [];
  public products: Array<any> = [];
  public showAddModal: boolean = false;
  public editingModal: boolean = false;
  public selectedService: any = {};
  @Output() back = new EventEmitter();

  constructor(private _service: ServiceService) {
    this.clearSelectedService();
  }

  clearSelectedService() {
    this.selectedService = {
      id: '',
      name: '',
      product: null,
      flag: 'S',
      code: '',
      price: ''
    };
  }

  async createService() {
    const newService = await this._service.createService(this.selectedService);
    this.services = this.services.concat(newService);
    this.clearSelectedService();
    this.showAddModal = false;
  }

  async loadServicesFromServer() {
    this.services = await this._service.getAllServices();
    this.products = await this._service.getAllProducts();
  }

  async editService() {
    await this._service.editService(this.selectedService);
    this.clearSelectedService();
    this.editingModal = false;
    this.showAddModal = false;
    this.ngOnInit();
  }

  showEditEditModal(service: any) {
    this.selectedService = service;
    this.showAddModal = true;
    this.editingModal = true;
  }

  async confirmAction() {
    if (this.editingModal)
      await this.editService();
    // Create new service
    else await this.createService();
  }

  public get isValidSelectedService(): boolean {
    return this.selectedService &&
      this.selectedService.name &&
      this.selectedService.product &&
      this.selectedService.flag &&
      this.selectedService.code &&
      this.selectedService.price;
  }

  ngOnInit(): void {
    this.clearSelectedService();
    this.loadServicesFromServer();
  }

}
