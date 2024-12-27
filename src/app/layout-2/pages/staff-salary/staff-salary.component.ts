import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { StaffService } from '../../../services/staff.service';
import { ColDef, GridApi, GridReadyEvent, ValueFormatterParams } from "@ag-grid-community/core";
import { AgGridAngular } from "@ag-grid-community/angular";

@Component({
  selector: 'app-staff-salary',
  standalone: true,
  imports: [
    MatExpansionModule,
    AgGridAngular
  ],
  templateUrl: './staff-salary.component.html',
  styleUrl: './staff-salary.component.scss'
})
export class StaffSalaryComponent {
  readonly panelOpenState = signal(true);

  rowHeight = 50;
  rowData: any;
  gridApi!: GridApi<any>;

  colDefs: ColDef[] = [
    { field: "name", headerName: 'Name', sortable: true, unSortIcon: true, flex: 1, },
    { field: "start_date", headerName: 'Start Date', sortable: true, unSortIcon: true, flex: 1 },
    { field: "end_date", headerName: 'End Date', sortable: true, unSortIcon: true, flex: 1 },
    { field: "expected_salary", valueFormatter: this.currencyFormatter, headerName: 'Expected Salary', sortable: true, unSortIcon: true, flex: 1 },
    { field: "hourly_rate", headerName: 'Hourly Rate', sortable: true, valueFormatter: this.currencyFormatter, unSortIcon: true, flex: 1 },
    { field: "confirm_salary", headerName: 'Confirmed Salary per Payroll', valueFormatter: this.currencyFormatter, sortable: true, unSortIcon: true, flex: 1 },
    { field: "hours_worked", headerName: 'Hours Worked', sortable: true, unSortIcon: true, flex: 1 },
  ];

  constructor(private staff: StaffService) {
    this.staff.getStaffSalary().subscribe(data => {
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
