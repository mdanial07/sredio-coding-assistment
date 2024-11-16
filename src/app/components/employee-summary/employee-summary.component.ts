import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-employee-summary',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './employee-summary.component.html',
  styleUrl: './employee-summary.component.scss' 
})
export class EmployeeSummaryComponent {
  rowData = [
    { name: "M Danial", timesheet_expected: 54, unconfirmed_timesheet: 21, confirmed_timesheet: 22, missing_timesheet: 11 },
    { name: "Darrell Steward", timesheet_expected: 57, unconfirmed_timesheet: 12, confirmed_timesheet: 33, missing_timesheet: 12 },
    { name: "Marvin McKinney", timesheet_expected: 99, unconfirmed_timesheet: 34, confirmed_timesheet: 44, missing_timesheet: 21 },
    { name: "Brooklyn Simmons", timesheet_expected: 130, unconfirmed_timesheet: 44, confirmed_timesheet: 55, missing_timesheet: 31 },
    { name: "Wade Warren", timesheet_expected: 128, unconfirmed_timesheet: 21, confirmed_timesheet: 66, missing_timesheet: 41 },
    { name: "Theresa Webb", timesheet_expected: 140, unconfirmed_timesheet: 56, confirmed_timesheet: 77, missing_timesheet: 51 },
  ];

  colDefs: ColDef[] = [
    { field: "name", headerName: 'Name', sortable: true, unSortIcon: true, flex: 1 },
    { field: "timesheet_expected", headerName: 'Timesheet Expected', sortable: true, unSortIcon: true, flex: 1 },
    { field: "unconfirmed_timesheet", headerName: 'Unconfirmed Timesheet', sortable: true, unSortIcon: true, flex: 1 },
    { field: "confirmed_timesheet", headerName: 'Confirmed Timesheet', sortable: true, unSortIcon: true, flex: 1 },
    { field: "missing_timesheet", headerName: 'Missing Timesheet', sortable: true, unSortIcon: true, flex: 1 }
  ];
}
