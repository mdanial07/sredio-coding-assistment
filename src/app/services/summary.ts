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

  getEmployeeSummary() {
    const employee_summary = [
      { name: "M Danial", image: '01', timesheet_expected: 54, unconfirmed_timesheet: 21, confirmed_timesheet: 22, missing_timesheet: 11 },
      { name: "Darrell Steward", image: '02', timesheet_expected: 57, unconfirmed_timesheet: 12, confirmed_timesheet: 33, missing_timesheet: 12 },
      { name: "Marvin McKinney", image: '03', timesheet_expected: 99, unconfirmed_timesheet: 34, confirmed_timesheet: 44, missing_timesheet: 21 },
      { name: "Brooklyn Simmons", image: '04', timesheet_expected: 130, unconfirmed_timesheet: 44, confirmed_timesheet: 55, missing_timesheet: 31 },
      { name: "Wade Warren", image: '05', timesheet_expected: 128, unconfirmed_timesheet: 21, confirmed_timesheet: 66, missing_timesheet: 41 },
      { name: "Theresa Webb", image: '01', timesheet_expected: 140, unconfirmed_timesheet: 56, confirmed_timesheet: 77, missing_timesheet: 51 },
    ]
    return of(employee_summary)
  }

  getSRAndERSummary() {
    const employee_summary = [
      { name: "Theresa Webb", image: '01', tracking_score: '70%', expected_hours: 120, worked_hours: 20, tracked_hours: 40, new: 10, fiber: 0, fd_test: 40, sr_and_ed_hours: 40 },
      { name: "Darrell Steward", image: '02', tracking_score: '87%', expected_hours: 100, worked_hours: 10, tracked_hours: 55, new: 22, fiber: 0, fd_test: 55, sr_and_ed_hours: 55 },
      { name: "Marvin McKinney", image: '03', tracking_score: '125%', expected_hours: 160, worked_hours: 60, tracked_hours: 10, new: 55, fiber: 0, fd_test: 10, sr_and_ed_hours: 10 },
      { name: "Brooklyn Simmons", image: '04', tracking_score: '152%', expected_hours: 220, worked_hours: 22, tracked_hours: 70, new: 60, fiber: 0, fd_test: 70, sr_and_ed_hours: 70 },
      { name: "Wade Warren", image: '05', tracking_score: '95%', expected_hours: 120, worked_hours: 12, tracked_hours: 50, new: 33, fiber: 0, fd_test: 50, sr_and_ed_hours: 50 },
      { name: "Danial", image: '01', tracking_score: '70%', expected_hours: 120, worked_hours: 20, tracked_hours: 40, new: 10, fiber: 0, fd_test: 40, sr_and_ed_hours: 40 },
    ]
    return of(employee_summary)
  }
}
