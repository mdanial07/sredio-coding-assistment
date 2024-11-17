import { Component } from '@angular/core';
import { SummaryService } from '../../services/summary';
import { EmpTableComponent } from '../emp-table/emp-table.component';
import { EmployeeNameAndImage } from '../../utils/emp-name-column';

@Component({
  selector: 'app-employee-summary',
  standalone: true,
  imports: [EmpTableComponent],
  templateUrl: './employee-summary.component.html',
  styleUrl: './employee-summary.component.scss'
})
export class EmployeeSummaryComponent {
  rowHeight = 50;
  rowData: any;

  colDefs = [
    { field: "name", headerName: 'Name', sortable: true, unSortIcon: true, flex: 1, cellRenderer: EmployeeNameAndImage },
    { field: "timesheet_expected", headerName: 'Timesheet Expected', sortable: true, unSortIcon: true, flex: 1 },
    { field: "unconfirmed_timesheet", headerName: 'Unconfirmed Timesheet', sortable: true, unSortIcon: true, flex: 1 },
    { field: "confirmed_timesheet", headerName: 'Confirmed Timesheet', sortable: true, unSortIcon: true, flex: 1 },
    { field: "missing_timesheet", headerName: 'Missing Timesheet', sortable: true, unSortIcon: true, flex: 1 }
  ];

  constructor(private summary: SummaryService) {
    this.summary.getEmployeeSummary().subscribe(data => {
      this.rowData = data;
    })
  }
}
