import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgClass, NgIf } from '@angular/common';
import { TabsSectionComponent } from './pages/tabs-section/tabs-section.component';
import { HoursComponent } from './pages/hours/hours.component';
import { ExpendituresComponent } from './pages/expenditures/expenditures.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { TotalStaffComponent } from './pages/total-staff/total-staff.component';
import { StaffSalaryComponent } from './pages/staff-salary/staff-salary.component';
import { OtherExpensesComponent } from './pages/other-expenses/other-expenses.component';
import { SummaryService } from '../services/summary';
import { TimesheetSummaryComponent } from '../components/timesheet-summary/timesheet-summary.component';

@Component({
  selector: 'app-layout-2',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    NgClass,
    RouterOutlet,
    TabsSectionComponent,
    HoursComponent,
    ExpendituresComponent,
    CreditsComponent,
    TotalStaffComponent,
    StaffSalaryComponent,
    OtherExpensesComponent,
    TimesheetSummaryComponent,
    NgIf,
  ],
  templateUrl: './layout-2.component.html',
  styleUrl: './layout-2.component.scss'
})
export class Layout2Component {

  page: string = 'hours';
  headerDates: any = {
    start: new Date("01-01-2024"),
    end: new Date("12-31-2024"),
  };
  timesheet_summary: any = [];

  constructor(
    private summary: SummaryService,
  ) { }

  ngOnInit(): void {
    this.getTimeSheet()
  }
  selection(event: string) {
    this.page = event
  }


  getTimeSheet(): void {
    this.summary.getTimesheetSummary().subscribe(timesheet => {
      if (timesheet) {
        this.timesheet_summary = timesheet;
      }
    })
  }

  dateRange(event: any) {
    this.headerDates = null;

    setTimeout(() => {
      this.headerDates = event;
    }, 1000);
  }
}
