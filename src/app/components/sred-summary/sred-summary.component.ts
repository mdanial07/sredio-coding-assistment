import { Component } from '@angular/core';
import { EmpTableComponent } from '../emp-table/emp-table.component';
import { SummaryService } from '../../services/summary';
import { EmployeeNameAndImage } from '../../utils/emp-name-column';

@Component({
  selector: 'app-sred-summary',
  standalone: true,
  imports: [EmpTableComponent],
  templateUrl: './sred-summary.component.html',
  styleUrl: './sred-summary.component.scss'
})
export class SredSummaryComponent {
  rowHeight = 50;
  rowData: any;

  colDefs = [
    { field: "name", headerName: 'Name', sortable: true, unSortIcon: true, flex: 1, cellRenderer: EmployeeNameAndImage },
    { field: "tracking_score", headerName: 'Tracking Score', sortable: true, unSortIcon: true, flex: 1 },
    { field: "expected_hours", headerName: 'Expected Hours', sortable: true, unSortIcon: true, flex: 1 },
    { field: "worked_hours", headerName: 'Worked Hours', sortable: true, unSortIcon: true, flex: 1 },
    { field: "tracked_hours", headerName: 'Tracked Hours', sortable: true, unSortIcon: true, flex: 1 },
    { field: "new", headerName: 'New', sortable: true, unSortIcon: true, flex: 1 },
    { field: "fiber", headerName: 'Fiber', sortable: true, unSortIcon: true, flex: 1 },
    { field: "fd_test", headerName: 'FD Test', sortable: true, unSortIcon: true, flex: 1 },
    { field: "sr_and_ed_hours", headerName: 'SR&ED Hours', sortable: true, unSortIcon: true, flex: 1 },
  ];

  constructor(private summary: SummaryService) {
    this.summary.getSRAndERSummary().subscribe(data => {
      this.rowData = data;
    })
  }
}
