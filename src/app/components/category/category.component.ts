import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  public showAddModal: boolean = false;
  public showAddSubCategoryModal: boolean = false;
  public newCategoryName: string = '';
  public newSubCategoryName: string = '';
  public categories: Array<any> = [];
  public subCategories: Array<any> = [];
  public selectedCategory: any = null;
  
  @Output() back = new EventEmitter<boolean>();

  constructor(private _service: CategoryService) { }

  async loadCategories() {
    this.categories = await this._service.getAllCategories();
    this.subCategories = await this._service.getAllSubCategories();
  }

  async createCategory() {
    if (!this.newCategoryName) return;
    this.categories = this.categories.concat(
      await this._service.createCategory(this.newCategoryName)
    );
    this.newCategoryName = '';
    this.showAddModal = false;
  }

  async createSubCategory() {
    await this._service.createSubCategory(
      this.selectedCategory.id,
      this.newSubCategoryName);
    this.newSubCategoryName = '';
    this.showAddSubCategoryModal = false;
    this.ngOnInit();
  }

  getSubCategoriesOf(category: any): Array<any> {
    return this.subCategories.filter(s => s.categoryId === category.id);
  }

  ngOnInit(): void {
    this.loadCategories();
  }

}
