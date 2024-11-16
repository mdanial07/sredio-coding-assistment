import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timesheet-summary',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass],
  templateUrl: './timesheet-summary.component.html',
  styleUrl: './timesheet-summary.component.scss'
})
export class TimesheetSummaryComponent {

  time_sheet_summary_widgets = [
    {
      name: "Timesheets Expected",
      value: 500,
      percentage: 20,
      positive: true,
    },
    {
      name: "Timesheets Created",
      value: 200,
      percentage: 10,
      positive: false,
    },
    {
      name: "Timesheets Accepted",
      value: 200,
      percentage: 20,
      positive: true,
    },
    {
      name: "Missing Timesheets",
      value: 300,
      percentage: 10,
      positive: false,
      remind: true,
    }
  ]
}
