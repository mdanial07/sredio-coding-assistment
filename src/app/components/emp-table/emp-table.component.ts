import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, } from "ag-grid-community";
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ModuleRegistry } from '@ag-grid-community/core';
import { NgIf } from '@angular/common';

ModuleRegistry.registerModules([
  CsvExportModule,
]);

@Component({
  selector: 'app-emp-table',
  standalone: true,
  imports: [AgGridAngular, NgIf],
  templateUrl: './emp-table.component.html',
  styleUrl: './emp-table.component.scss'
})
export class EmpTableComponent implements OnInit {
  @Input() title!: string;
  @Input() rowHeight!: number;
  @Input() tableId!: any;
  @Input() rowData!: [];
  @Input() colDefs!: ColDef[];
  isBrowser: boolean = false;

  private gridApi!: GridApi<any>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = this.rowData;
  }

  onBtExport(): void {
    this.gridApi.exportDataAsCsv();
  }

  onFilterTextBoxChanged(): void {
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById(this.tableId) as HTMLInputElement).value,
    );
  }
}
