import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { StaffService } from '../../../services/staff.service';
import { AgGridAngular } from "@ag-grid-community/angular";
import { ColDef, GridApi, GridReadyEvent, ValueFormatterParams } from "@ag-grid-community/core";

@Component({
  selector: 'app-other-expenses',
  standalone: true,
  imports: [
    MatExpansionModule,
    AgGridAngular
  ],
  templateUrl: './other-expenses.component.html',
  styleUrl: './other-expenses.component.scss'
})
export class OtherExpensesComponent {
  readonly panelOpenState = signal(true);
  readonly panelOpenState2 = signal(true);

  rowHeight = 50;
  rowData: any;
  gridApi!: GridApi<any>;
  public grandTotalRow: "top" | "bottom" = "bottom";

  colDefs: ColDef[] = [
    { field: "invoice_date", headerName: 'Invoice Submitted', sortable: true, unSortIcon: true, flex: 1, },
    { field: "invoice_number", headerName: 'Invoice Number', sortable: true, unSortIcon: true, flex: 1 },
    { field: "invoice_amount", aggFunc: "sum", valueFormatter: this.currencyFormatter, headerName: 'Invoice Amount', sortable: true, unSortIcon: true, flex: 1 },
    { field: "vendor_name", headerName: 'Vendor Name', sortable: true, unSortIcon: true, flex: 1 },
    { field: "project", headerName: 'Project', sortable: true, unSortIcon: true, flex: 1 },
    { field: "provider_name", headerName: 'Name of Provider', sortable: true, unSortIcon: true, flex: 1 },
    { field: "description", headerName: 'Description', sortable: true, unSortIcon: true, flex: 1 },
    { field: "is_sred", headerName: 'Is SR&ED', sortable: true, unSortIcon: true, flex: 1 },
    { field: "province", headerName: 'Province', sortable: true, unSortIcon: true, flex: 1 },
    { field: "status", headerName: 'Status', sortable: true, unSortIcon: true, flex: 1 },
  ];

  constructor(private staff: StaffService) {
    this.staff.getVendorInvoices().subscribe(data => {
      this.rowData = data;
    })
  }

  currencyFormatter(params: ValueFormatterParams) {
    return "$" + Math.floor(params.value).toLocaleString();
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = this.rowData;
  }
}
