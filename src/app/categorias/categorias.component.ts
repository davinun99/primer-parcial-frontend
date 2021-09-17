import { Component, OnInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { Categorias } from '../model/categorias';
import { ServiceCategoriasService } from '../service/service-categorias.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}
declare const $: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent implements OnInit {
  public dataTable: DataTable;
  categorias: Categorias[];

  constructor(private servicioCategorias: ServiceCategoriasService) { }

  ngOnInit(): void {

    this.servicioCategorias.getCategorias().subscribe(
      entity => {
        this.categorias = entity.lista
      },
      error =>console.log('no se pudieron conseguir las categorias')
     );
     
      this.dataTable = {
          headerRow: [ 'Id', 'Descripcion','Acciones' ],
          footerRow: [ 'Id', 'Descripcion','Acciones' ],

          dataRows: [
          ]
       };

  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    const table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function(e) {
      let $tr = $(this).closest('tr');
      if ($($tr).hasClass('child')) {
        $tr = $tr.prev('.parent');
      }

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
      e.preventDefault();
    });

    // Delete a record
    table.on('click', '.remove', function(e) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function(e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }
}
