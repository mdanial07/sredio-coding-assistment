import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class SummaryService {

  getTimesheetSummary() {
    const time_sheet_summary_widgets = [
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
      }]
    return of(time_sheet_summary_widgets)
  }
}
