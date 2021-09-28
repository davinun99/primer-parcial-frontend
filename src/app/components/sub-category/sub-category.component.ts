import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'sub-category-list',
  templateUrl: './sub-category.component.html'
})
export class SubCategoryComponent implements OnInit {

  @Input() subCategories: Array<any> = [];
  @Input() category: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
