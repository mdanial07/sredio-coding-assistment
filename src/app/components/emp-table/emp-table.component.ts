import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, ModuleRegistry, CsvExportModule } from "ag-grid-community";
ModuleRegistry.registerModules([
  CsvExportModule,
]);

@Component({
  selector: 'app-emp-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './emp-table.component.html',
  styleUrl: './emp-table.component.scss'
})
export class EmpTableComponent {
  @Input() title!: string;
  @Input() rowHeight!: number;
  @Input() tableId!: any;
  @Input() rowData!: [];
  @Input() colDefs!: ColDef[];

  private gridApi!: GridApi<any>;

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
