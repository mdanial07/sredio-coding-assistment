import { Component } from '@angular/core';
import { TimesheetSummaryComponent } from '../../components/timesheet-summary/timesheet-summary.component';
import { OverallHoursComponent } from '../../components/overall-hours/overall-hours.component';
import { ProjectHoursComponent } from '../../components/project-hours/project-hours.component';
import { EmployeeSummaryComponent } from '../../components/employee-summary/employee-summary.component';
import { SredSummaryComponent } from '../../components/sred-summary/sred-summary.component';
import { SummaryService } from '../../services/summary';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [SummaryService],
  imports: [
    OverallHoursComponent,
    TimesheetSummaryComponent,
    ProjectHoursComponent,
    EmployeeSummaryComponent,
    SredSummaryComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  timesheet_summary: any = [];

  constructor(private summary: SummaryService) { }

  ngOnInit(): void {
    this.getTimeSheet()
  }

  getTimeSheet(): void {
    this.summary.getTimesheetSummary().subscribe(timesheet => {
      if (timesheet) {
        this.timesheet_summary = timesheet;
      }
    })
  }
}
