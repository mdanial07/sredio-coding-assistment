import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class OverallHoursService {

  getTotalWorkedHours() {
    const total_hours = [
      { asset: "Total Worked Hours", amount: 600 },
      { asset: "Total Tracked Hours", amount: 400 },
    ]
    return of(total_hours)
  }
  getCumulativeHours() {
    const cumulative_hours = [
      {
        month: "Jan",
        total_hours: 50,
        cumulative_hours: 500,
      },
      {
        month: "Feb",
        total_hours: 200,
        cumulative_hours: 500,
      },
      {
        month: "Mar",
        total_hours: 90,
        cumulative_hours: 1000,
      },
      {
        month: "Apr",
        total_hours: 250,
        cumulative_hours: 700,
      },
      {
        month: "May",
        total_hours: 120,
        cumulative_hours: 500,
      },
      {
        month: "Jun",
        total_hours: 20,
        cumulative_hours: 90,
      },
      {
        month: "Jul",
        total_hours: 60,
        cumulative_hours: 90,
      },
      {
        month: "Aug",
        total_hours: 60,
        cumulative_hours: 500,
      },
      {
        month: "Sep",
        total_hours: 250,
        cumulative_hours: 90,
      }
    ]
    return of(cumulative_hours)
  }
}
